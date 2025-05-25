<template>
    <USlideover
        title="Símbolos Kanji"
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
            <div class="flex flex-col items-start justify-center gap-8">Hola</div>
        </template>
    </USlideover>
</template>

<script lang="ts" setup></script>
