<!-- components/ThemeToggle.vue -->
<template>
    <div class="flex flex-col gap-8">
        <div class="flex justify-end">
            <UButton
                @click="toggleColorMode"
                color="primary"
                icon="i-heroicons-moon"
                :trailing="colorMode.value === 'dark'"
            >
                {{ colorMode.value === 'dark' ? 'Modo Claro' : 'Modo Oscuro' }}
            </UButton>
        </div>
        <div
            v-for="color in [
                'primary',
                'secondary',
                'tertiary',
                'info',
                'success',
                'warning',
                'error'
            ]"
            :key="color"
            class="mb-6"
        >
            <h4 class="font-medium mb-2 capitalize">{{ color }}</h4>
            <div class="grid grid-cols-11 gap-1">
                <div
                    v-for="shade in [
                        '50',
                        '100',
                        '200',
                        '300',
                        '400',
                        '500',
                        '600',
                        '700',
                        '800',
                        '900',
                        '950'
                    ]"
                    :key="shade"
                    class="flex flex-col items-center"
                >
                    <div
                        class="w-10 h-10 rounded-md shadow-sm"
                        :style="{ backgroundColor: `var(--color-${color}-${shade})` }"
                    ></div>
                    <span class="text-xs mt-1">{{ shade }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const colorMode = useColorMode()

    function toggleColorMode() {
        colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
    }
</script>
