export type PredictionResponse = {
    confidence: number
    predictions: {
        fire: number
        water: number
        mountain: number
        tree: number
    }
    success: boolean
    top_class: string
}
