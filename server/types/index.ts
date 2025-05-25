interface ResponseRequest {
    success: boolean
    body: {
        message: string
        details?: string
    }
}
