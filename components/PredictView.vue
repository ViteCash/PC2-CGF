<template>
    <div class="flex flex-col gap-8 justify-center items-center">
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
            <UButton icon="i-heroicons-paper-airplane" :loading="isLoading"> Enviar </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const {
    setCanvas,
    clearCanvas,
    submitDrawing,
    startDrawing,
    isLoading,
    draw,
    stopDrawing,
    handleTouchStart,
    handleTouchMove
} = useCanvasDrawing()
</script>
