<template>
    <div
        style="touch-action: none"
        class="relative w-full border border-primary-200 rounded-lg bg-white shadow-md overflow-hidden shadow-primary-100"
    >
        <canvas
            ref="canvas"
            width="600"
            height="360"
            class="w-full h-full"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="stopDrawing"
        />
    </div>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)

const emit = defineEmits<{
    (e: 'startDrawing', event: MouseEvent): void
    (e: 'draw', event: MouseEvent): void
    (e: 'stopDrawing'): void
    (e: 'handleTouchStart', event: TouchEvent): void
    (e: 'handleTouchMove', event: TouchEvent): void
    (e: 'canvasReady', canvas: HTMLCanvasElement): void
}>()

const startDrawing = (event: MouseEvent) => {
    emit('startDrawing', event)
}

const draw = (event: MouseEvent) => {
    emit('draw', event)
}

const stopDrawing = () => {
    emit('stopDrawing')
}

const handleTouchStart = (event: TouchEvent) => {
    emit('handleTouchStart', event)
}

const handleTouchMove = (event: TouchEvent) => {
    emit('handleTouchMove', event)
}

onMounted(() => {
    if (canvas.value) {
        emit('canvasReady', canvas.value)
    }
})
</script>
