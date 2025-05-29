<template>
    <div v-if="!prediction.success" class="flex flex-col gap-8 justify-center items-center">
        <div class="flex flex-col items-center gap-3 bg-white p-1 shadow-sm shadow-white">
            <h1 class="text-2xl sm:text-3xl font-bold text-center">
                Dibuja un caracter a predecir
            </h1>
            <p class="text-sm">Escoge cualquiera 水, 火, 山, 木</p>
        </div>
        <CanvasDrawing
            @canvas-ready="setCanvas"
            @startDrawing="startDrawing"
            @draw="draw"
            @stopDrawing="stopDrawing"
            @handleTouchStart="handleTouchStart"
            @handleTouchMove="handleTouchMove"
        />
        <div class="flex items-center gap-4 bg-white">
            <UButton variant="ghost" icon="i-heroicons-trash" @click="clearCanvas">
                Limpiar
            </UButton>
            <UButton
                icon="i-heroicons-paper-airplane"
                :loading="isSubmitting"
                @click="predictDrawing"
            >
                Enviar
            </UButton>
        </div>
    </div>
    <div v-else class="flex flex-col gap-8 justify-center items-center">
        <DonutChart
            :data="donutData"
            :height="290"
            :radius="5"
            :type="'full'"
            :labels="marketShareLabels"
        >
            <div class="absolute flex flex-col items-center gap-4 text-center">
                <div
                    class="font-semibold text-7xl"
                    :style="{ color: getDarkerColor(prediction.top_class) }"
                >
                    {{ getKanjiSymbol(prediction.top_class) }}
                </div>
                <div class="text-(--ui-text-muted)">
                    {{ prediction.confidence.toFixed(1) }}% de confianza
                </div>
            </div>
        </DonutChart>
        <UButton variant="subtle" icon="i-heroicons-arrow-uturn-left" @click="predictAgain">
            Predecir otro dibujo
        </UButton>
    </div>
</template>

<script lang="ts" setup>
const {
    canvas,
    setCanvas,
    clearCanvas,
    startDrawing,
    draw,
    stopDrawing,
    handleTouchStart,
    handleTouchMove
} = useCanvasDrawing()

const {
    isSubmitting,
    prediction,
    predictAgain,
    predictDrawing,
    getKanjiSymbol,
    getDarkerColor,
    marketShareLabels
} = usePredictDrawing(canvas)

const donutData = computed(() => {
    if (!prediction.value.predictions) return []
    return [
        prediction.value.predictions.fire,
        prediction.value.predictions.water,
        prediction.value.predictions.mountain,
        prediction.value.predictions.tree
    ]
})
</script>
