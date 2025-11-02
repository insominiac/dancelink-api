import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = new Set([
  'https://dancelink-liart.vercel.app',
  'http://localhost:3000',
])

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const isAllowed = ALLOWED_ORIGINS.has(origin)

  // Preflight
  if (req.method === 'OPTIONS') {
    const res = new NextResponse(null, { status: 204 })
    if (isAllowed) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Vary', 'Origin')
      res.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.headers.set('Access-Control-Allow-Credentials', 'true')
      res.headers.set('Access-Control-Max-Age', '86400')
    }
    return res
  }

  const res = NextResponse.next()
  if (isAllowed) {
    res.headers.set('Access-Control-Allow-Origin', origin)
    res.headers.set('Vary', 'Origin')
    res.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  return res
}

export const config = {
  matcher: ['/api/:path*'],
}
