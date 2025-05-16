enum GreekLetter {
    ALPHA = 'α',
    BETA = 'β',
    THETA = 'θ'
}

const currentLetterIndex = ref(0)

export const useUseGreekLetter = () => {
    const availableLetters = [
        { key: 'ALPHA' as GreekLetterKey, symbol: GreekLetter.ALPHA },
        { key: 'BETA' as GreekLetterKey, symbol: GreekLetter.BETA },
        { key: 'THETA' as GreekLetterKey, symbol: GreekLetter.THETA }
    ]

    type GreekLetterKey = keyof typeof GreekLetter

    const currentLetter = computed(() => availableLetters[currentLetterIndex.value])

    const nextLetter = () => {
        currentLetterIndex.value = (currentLetterIndex.value + 1) % availableLetters.length
    }

    const setLetterByKey = (key: GreekLetterKey) => {
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
