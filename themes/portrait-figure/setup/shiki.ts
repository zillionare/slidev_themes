import { defineShikiSetup } from '@slidev/types'

// export default defineShikiSetup(async({ loadTheme }) => {
//   return {
//     theme: {
//       dark: await loadTheme(require.resolve('theme-vitesse/themes/vitesse-dark.json')),
//       light: await loadTheme(require.resolve('theme-vitesse/themes/vitesse-light.json')),
//     },
//   }
// })
export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'min-dark',
      light: 'min-light'
    },
    transformers: [
      // ...
    ]
  }
})
