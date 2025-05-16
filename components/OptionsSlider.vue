<template>
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
                    <USlider
                        :model-value="lineWidth"
                        @update:model-value="$emit('update:lineWidth', $event)"
                        :min="1"
                        :max="20"
                    />
                </div>
                <div class="flex flex-col items-start w-full gap-5">
                    <span class="text-md font-semibold">Color de trazo</span>
                    <UColorPicker
                        :model-value="lineColor"
                        @update:model-value="$emit('update:lineColor', $event)"
                    />
                </div>
            </div>
        </template>
    </USlideover>
</template>

<script lang="ts" setup>
defineProps({
    lineWidth: {
        type: Number,
        default: 5
    },
    lineColor: {
        type: String,
        default: '#000000'
    }
})

defineEmits(['update:lineWidth', 'update:lineColor'])
</script>
