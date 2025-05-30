<template>
    <USlideover
        title="Que son los Kanjis?"
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
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">
                        Los Kanjis son caracteres chinos utilizados en el sistema de escritura
                        japonés. Son símbolos que representan palabras o conceptos completos, a
                        diferencia de los sistemas silábicos como Hiragana y Katakana.
                    </p>
                    <p class="text-lg text-gray-700">
                        En este proyecto, nos enfocamos en cuatro elementos fundamentales de la
                        naturaleza:
                    </p>
                    <ul class="list-disc list-inside space-y-5 text-gray-700">
                        <li>
                            <span
                                class="text-red-500 text-xl font-bold size-5 bg-[#F5E6D3] rounded-xl p-2"
                                >火</span
                            >
                            (ka/hi) - Fuego
                        </li>
                        <li>
                            <span
                                class="text-blue-500 text-xl font-bold size-5 bg-[#F5E6D3] rounded-xl p-2"
                                >水</span
                            >
                            (sui/mizu) - Agua
                        </li>
                        <li>
                            <span
                                class="text-emerald-600 text-xl font-bold size-5 bg-[#F5E6D3] rounded-xl p-2"
                                >木</span
                            >
                            (moku/ki) - Árbol
                        </li>
                        <li>
                            <span
                                class="text-stone-500 text-xl font-bold size-5 bg-[#F5E6D3] rounded-xl p-2"
                                >山</span
                            >
                            (san/yama) - Montaña
                        </li>
                    </ul>
                    <p class="text-lg text-gray-700">
                        Estos Kanjis representan elementos básicos que forman parte fundamental de
                        la naturaleza y la cultura japonesa. Cada uno tiene un significado profundo
                        y se utiliza frecuentemente en la escritura cotidiana.
                    </p>
                </div>
            </div>
        </template>
    </USlideover>
</template>

<script lang="ts" setup></script>
