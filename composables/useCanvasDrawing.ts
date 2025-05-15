import { ref, onMounted } from 'vue'

export const useCanvasDrawing = () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    const ctx = ref<CanvasRenderingContext2D | null>(null)
    const isDrawing = ref(false)
    const lineWidth = ref(5)
    const lineColor = ref('#000000')
    const lastPos = ref({ x: 0, y: 0 })

    const setCanvas = (canvasElement: HTMLCanvasElement) => {
        canvas.value = canvasElement

        if (canvas.value) {
            ctx.value = canvas.value.getContext('2d')
            setCanvasStyle()

            const rect = canvas.value.getBoundingClientRect()
            canvas.value.width = rect.width * 2
            canvas.value.height = rect.height * 2
            ctx.value?.scale(2, 2)
        }
    }

    const setCanvasStyle = () => {
        if (!ctx.value) return

        ctx.value.lineWidth = lineWidth.value
        ctx.value.strokeStyle = lineColor.value
        ctx.value.lineCap = 'round'
        ctx.value.lineJoin = 'round'
    }

    const startDrawing = (e: MouseEvent) => {
        isDrawing.value = true
        const pos = getPointerPosition(e)
        lastPos.value = pos

        ctx.value?.beginPath()
        ctx.value?.moveTo(pos.x, pos.y)
        ctx.value?.lineTo(pos.x, pos.y)
        ctx.value?.stroke()
    }

    const draw = (e: MouseEvent) => {
        if (!isDrawing.value) return
        setCanvasStyle()

        const pos = getPointerPosition(e)

        ctx.value?.beginPath()
        ctx.value?.moveTo(lastPos.value.x, lastPos.value.y)
        ctx.value?.lineTo(pos.x, pos.y)
        ctx.value?.stroke()

        lastPos.value = pos
    }

    const stopDrawing = () => {
        isDrawing.value = false
    }

    const getPointerPosition = (e: MouseEvent) => {
        const rect = canvas.value!.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault()
        if (e.touches.length === 1) {
            const touch = e.touches[0]
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            startDrawing(mouseEvent)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        if (e.touches.length === 1) {
            const touch = e.touches[0]
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            draw(mouseEvent)
        }
    }

    const clearCanvas = () => {
        if (canvas.value && ctx.value) {
            ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
        }
    }

    const submitDrawing = () => {
        if (!canvas.value) return

        // Obtener la imagen del canvas como base64
        const imageData = canvas.value.toDataURL('image/png')

        // Aquí puedes enviar los datos a tu backend
        console.log('Enviando dibujo:', imageData.substring(0, 50) + '...')

        // Por ejemplo, podrías hacer:
        // await $fetch('/api/submit-drawing', {
        //   method: 'POST',
        //   body: { image: imageData }
        // })

        alert('¡Dibujo enviado con éxito!')
    }

    return {
        canvas,
        setCanvas,
        ctx,
        isDrawing,
        lineWidth,
        lineColor,
        startDrawing,
        draw,
        stopDrawing,
        handleTouchStart,
        handleTouchMove,
        clearCanvas,
        submitDrawing
    }
}
