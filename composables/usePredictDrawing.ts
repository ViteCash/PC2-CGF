import type { PredictionResponse } from '@/composables/types'
import { ref } from 'vue'

export const usePredictDrawing = (canvas: Ref<HTMLCanvasElement | null>) => {
    const isSubmitting = ref(false)
    const prediction = ref({} as PredictionResponse)
    const config = useRuntimeConfig()

    const { clearCanvas } = useCanvasDrawing()

    const toast = useToast()

    const marketShareLabels = [
        { name: 'Fuego (火)', color: '#ea580c' },
        { name: 'Agua (水)', color: '#60a5fa' },
        { name: 'Montaña (山)', color: '#d4b483' },
        { name: 'Árbol (木)', color: '#22c55e' }
    ]

    const getKanjiSymbol = (topClass: string) => {
        const symbols = {
            fire: '火',
            water: '水',
            mountain: '山',
            tree: '木'
        }
        return symbols[topClass as keyof typeof symbols] || topClass
    }

    const getDarkerColor = (topClass: string) => {
        const colors = {
            fire: '#9a3412',
            water: '#2563eb',
            mountain: '#92400e',
            tree: '#15803d'
        }
        return colors[topClass as keyof typeof colors] || '#000000'
    }

    const predictAgain = () => {
        prediction.value = {} as PredictionResponse
        clearCanvas()
    }

    const predictDrawing = async () => {
        isSubmitting.value = true

        if (!canvas.value) return

        const fullDataURL = canvas.value.toDataURL('image/png')
        const base64Img = fullDataURL.split(',')[1]

        const response: PredictionResponse = await $fetch(`${config.public.apiBase}/predict`, {
            method: 'post',
            body: { image: base64Img }
        })

        if (!response.success) {
            isSubmitting.value = false
            toast.add({
                title: 'Error prediciendo imagen',
                description: 'No se pudo obtener una predicción válida',
                icon: 'i-heroicons-x-circle',
                color: 'error'
            })
            return
        }

        isSubmitting.value = false
        prediction.value = response
        clearCanvas()
    }

    return {
        marketShareLabels,
        getKanjiSymbol,
        predictAgain,
        getDarkerColor,
        isSubmitting,
        prediction,
        predictDrawing
    }
}
