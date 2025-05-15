<template>
    <main
        class="flex flex-col gap-8 items-center justify-center h-full bg-[url(/bg-pattern.svg)] bg-repeat"
    >
        <USlideover
            title="Opciones"
            :close="{
                color: 'primary',
                variant: 'outline'
            }"
        >
            <UButton
                icon="i-heroicons-bars-3"
                variant="subtle"
                size="xl"
                class="absolute top-4 right-4 sm:top-8 sm:right-8"
            />
            <template #body>
                <div class="flex flex-col items-start justify-center gap-8">
                    <div class="flex flex-col items-start w-full gap-5">
                        <span class="text-md font-semibold">Grosor</span>
                        <USlider v-model="lineWidth" :min="1" :max="20" />
                    </div>
                    <div class="flex flex-col items-start w-full gap-5">
                        <span class="text-md font-semibold">Color de trazo</span>
                        <UColorPicker v-model="lineColor" />
                    </div>
                </div>
            </template>
        </USlideover>
        <div class="flex flex-col items-center gap-3 bg-white">
            <h1 class="text-3xl font-bold">
                Dibujando la letra <span class="text-4xl text-primary-500">U</span>
            </h1>
            <p class="text-sm text-gray-600">Utiliza el panel a continuación para practicar</p>
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
            <UButton variant="ghost" icon="i-heroicons-sparkles" @click="clearCanvas">
                Limpiar
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
</script>
