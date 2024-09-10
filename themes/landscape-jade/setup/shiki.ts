import { transformerMetaWordHighlight, transformerNotationDiff } from '@shikijs/transformers'
import { defineShikiSetup } from '@slidev/types'

console.log("configure shiki from landscape-jade")
export default defineShikiSetup(() => {
    return {
        themes: {
            dark: 'min-dark',
            light: 'min-light',
        },
        transformers: [
            transformerNotationDiff(),
            transformerMetaWordHighlight(),
        ]
    }
})
