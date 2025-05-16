<template>
    <main
        class="flex flex-col gap-8 items-center justify-center h-full bg-[url(/bg-pattern.svg)] bg-repeat"
    >
        <OptionsSlider v-model:line-width="lineWidth" v-model:line-color="lineColor" />
        <div class="flex flex-col items-center gap-3 bg-white">
            <h1 class="text-3xl font-bold">
                Dibujando la letra
                <span class="text-4xl text-primary-500">{{ currentLetter.symbol }}</span>
            </h1>
            <p class="text-sm">Utiliza el panel a continuación para practicar</p>
        </div>
        <CanvasDrawing
            @canvas-ready="setCanvas"
            @startDrawing="startDrawing"
            @draw="draw"
            @stopDrawing="stopDrawing"
            @handleTouchStart="handleTouchStart"
            @handleTouchMove="handleTouchMove"
        />
        <div class="flex justify-center gap-4 bg-white">
            <UButton variant="soft" icon="i-heroicons-trash" @click="clearCanvas">
                Limpiar
            </UButton>
            <UButton variant="soft" icon="i-heroicons-arrow-path" @click="nextLetter">
                Cambiar letra
            </UButton>
            <UButton icon="i-heroicons-paper-airplane" @click="submitDrawing"> Enviar </UButton>
        </div>
    </main>
</template>

<script setup lang="ts">
const {
    setCanvas,
    clearCanvas,
    submitDrawing,
    lineWidth,
    lineColor,
    startDrawing,
    draw,
    stopDrawing,
    handleTouchStart,
    handleTouchMove
} = useCanvasDrawing()

const { currentLetter, nextLetter } = useUseGreekLetter()
</script>
