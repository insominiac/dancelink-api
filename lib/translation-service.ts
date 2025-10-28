type Lang = string

function sanitizeLang(input: any, fallback: Lang = 'en'): Lang {
  try {
    const raw = String(input || '').trim().toLowerCase()
    if (!raw) return fallback
    if (raw === '*' || raw === 'und' || raw === 'null' || raw === 'undefined') return fallback
    const m = raw.match(/^[a-z]{2}(-[a-z]{2})?$/i)
    return m ? raw : fallback
  } catch {
    return fallback
  }
}

class TranslationService {
  private apiKey?: string

  constructor() {
    this.apiKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY
  }

  async translate(text: string, target: Lang, source: Lang = 'en'): Promise<string> {
    const tgt = sanitizeLang(target)
    const src = sanitizeLang(source)
    const base = (text || '').trim()
    if (!base) return ''
    if (tgt === src) return base

    if (!this.apiKey) return base // No key configured; noop

    try {
      const url = 'https://translation.googleapis.com/language/translate/v2'
      const params = new URLSearchParams({ key: this.apiKey, q: base, target: tgt, source: src })
      const res = await fetch(`${url}?${params.toString()}`, { method: 'POST' })
      if (!res.ok) return base
      const data = await res.json()
      const translated = data?.data?.translations?.[0]?.translatedText
      return typeof translated === 'string' && translated ? translated : base
    } catch {
      return base
    }
  }

  async translateBatch(texts: string[], target: Lang, source: Lang = 'en'): Promise<string[]> {
    const clean = (texts || []).map(t => (String(t || '')).trim())
    const tgt = sanitizeLang(target)
    const src = sanitizeLang(source)

    if (!this.apiKey || tgt === src) {
      return clean
    }

    try {
      const url = 'https://translation.googleapis.com/language/translate/v2'
      const params = new URLSearchParams({ key: this.apiKey, target: tgt, source: src })
      // q can be provided multiple times
      clean.forEach(q => params.append('q', q))
      const res = await fetch(`${url}?${params.toString()}`, { method: 'POST' })
      if (!res.ok) return clean
      const data = await res.json()
      const translations = data?.data?.translations
      if (!Array.isArray(translations)) return clean
      return translations.map((t: any, i: number) => (t?.translatedText ?? clean[i] ?? ''))
    } catch {
      return clean
    }
  }
}

export const translationService = new TranslationService()
export default TranslationService