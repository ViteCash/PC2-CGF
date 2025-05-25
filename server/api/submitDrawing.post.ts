import { defineEventHandler, readBody } from 'h3'
import { getConnection } from '../utils/db'

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const { img, tag } = body

        if (!img || !tag) {
            return {
                success: false,
                body: { message: 'Faltan datos requeridos (imagen o tag)' }
            } as ResponseRequest
        }

        const connection = await getConnection()

        try {
            const [result] = await connection.execute(
                'INSERT INTO NeuralNetwork (img, img_tag) VALUES (?, ?)',
                [img, tag]
            )

            await connection.end()

            return {
                success: true,
                body: {
                    message: `Imagen guardada correctamente con el tag: ${tag}`
                }
            } as ResponseRequest
        } catch (dbError: any) {
            console.error('Error al guardar en la base de datos:', dbError)
            await connection.end()

            return {
                success: false,
                body: { message: 'Error al guardar en la base de datos', details: dbError.message }
            } as ResponseRequest
        }
    } catch (error: any) {
        console.error('Error general:', error)
        return {
            success: false,
            body: { message: 'Error interno del servidor', details: error.message }
        } as ResponseRequest
    }
})
