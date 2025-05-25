<template>
    <main
        class="flex flex-col items-center justify-center h-full bg-[url(/bg-pattern.svg)] bg-repeat"
    >
        <DetailsSlider />
        <UTabs :items="items" class="w-full max-w-lg">
            <template #train>
                <TrainView class="h-[450px] sm:h-[500px] md:h-[550px]" />
            </template>
            <template #predict>
                <PredictView class="h-[450px] sm:h-[500px] md:h-[550px]" />
            </template>
        </UTabs>
    </main>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
    {
        label: 'Entrenar',
        icon: 'i-heroicons-rocket-launch',
        slot: 'train'
    },
    {
        label: 'Predecir',
        icon: 'i-heroicons-sparkles',
        slot: 'predict'
    }
])
</script>
