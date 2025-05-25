enum KanjiSymbols {
    WATER = '水',
    FIRE = '火',
    MOUNTAIN = '山',
    TREE = '木'
}

const currentLetterIndex = ref(0)

export const useKanjiSymbol = () => {
    const availableLetters = [
        { key: 'WATER' as KanjiSymbolKey, symbol: KanjiSymbols.WATER },
        { key: 'FIRE' as KanjiSymbolKey, symbol: KanjiSymbols.FIRE },
        { key: 'MOUNTAIN' as KanjiSymbolKey, symbol: KanjiSymbols.MOUNTAIN },
        { key: 'TREE' as KanjiSymbolKey, symbol: KanjiSymbols.TREE }
    ]

    type KanjiSymbolKey = keyof typeof KanjiSymbols

    const currentLetter = computed(() => availableLetters[currentLetterIndex.value])

    const nextLetter = () => {
        currentLetterIndex.value = (currentLetterIndex.value + 1) % availableLetters.length
    }

    const setLetterByKey = (key: KanjiSymbolKey) => {
        const index = availableLetters.findIndex(letter => letter.key === key)
        if (index !== -1) {
            currentLetterIndex.value = index
        }
    }

    return {
        availableLetters,
        currentLetter,
        currentLetterIndex,
        nextLetter,
        setLetterByKey
    }
}
