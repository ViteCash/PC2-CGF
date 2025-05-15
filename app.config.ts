export default defineAppConfig({
    ui: {
        button: {
            slots: {
                base: 'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 focus-visible:ring-2 focus-visible:outline-solid cursor-pointer'
            }
        }
    }
})
