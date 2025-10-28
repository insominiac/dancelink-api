import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Minimal i18next setup to satisfy client components importing `@/lib/i18n`.
// We intentionally keep resources empty; components use server-side translation
// or fallback to keys/text when not present. This avoids build-time errors.
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: { common: {} },
      },
      ns: ['common'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      // Disable suspense to reduce hydration edge cases
      react: { useSuspense: false } as any,
    })
}

export default i18n