import { defineEventHandler, readBody } from 'h3'
import { getConnection } from '../utils/db'

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const { img, tag } = body

        if (!img || !tag) {
            return {
                status: 400,
                body: { error: 'Faltan datos requeridos (imagen o tag)' }
            }
        }

        const connection = await getConnection()

        try {
            const [result] = await connection.execute(
                'INSERT INTO NeuralNetwork (img, img_tag) VALUES (?, ?)',
                [img, tag]
            )

            await connection.end()

            return {
                status: 200,
                body: {
                    message: `Imagen guardada correctamente con el tag: ${tag}`
                }
            }
        } catch (dbError: any) {
            console.error('Error al guardar en la base de datos:', dbError)
            await connection.end()

            return {
                status: 500,
                body: { error: 'Error al guardar en la base de datos', details: dbError.message }
            }
        }
    } catch (error: any) {
        console.error('Error general:', error)
        return {
            status: 500,
            body: { error: 'Error interno del servidor', details: error.message }
        }
    }
})
