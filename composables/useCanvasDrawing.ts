import { ref } from 'vue'

export const useCanvasDrawing = () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    const ctx = ref<CanvasRenderingContext2D | null>(null)

    const lineColor = ref('#701510')
    const lastPos = ref({ x: 0, y: 0 })

    const isDrawing = ref(false)
    const lineWidth = ref(5)
    const isLoading = ref(false)

    const toast = useToast()
    const { currentLetter, nextLetter } = useKanjiSymbol()

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

    const submitDrawing = async () => {
        isLoading.value = true

        if (!canvas.value) return

        const fullDataURL = canvas.value.toDataURL('image/png', 0.7)
        const base64Img = fullDataURL.split(',')[1]

        const response = await $fetch('/api/submitDrawing', {
            method: 'post',
            body: { img: base64Img, tag: currentLetter.value.key }
        })

        if (!response.success) {
            isLoading.value = false
            toast.add({
                title: response.body.message,
                description: response.body.details,
                icon: 'i-heroicons-x-circle',
                color: 'error'
            })
            return
        }

        isLoading.value = false
        clearCanvas()
        nextLetter()
    }

    const predictDrawing = async () => {
        if (!canvas.value) return

        const fullDataURL = canvas.value.toDataURL('image/png')
        const base64Img = fullDataURL.split(',')[1]

        const response = await $fetch('/api/drawing/predict', {
            method: 'post',
            body: { img: base64Img }
        })

        return response
    }

    return {
        canvas,
        setCanvas,
        ctx,
        isDrawing,
        startDrawing,
        draw,
        isLoading,
        stopDrawing,
        handleTouchStart,
        handleTouchMove,
        clearCanvas,
        submitDrawing
    }
}
