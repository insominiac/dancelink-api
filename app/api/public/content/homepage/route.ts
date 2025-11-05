import { NextRequest, NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

// Default homepage content (fallback)
const DEFAULT_CONTENT = {
  heroTitle: "Master the Art of Dance",
  heroSubtitle: "Join our community of passionate dancers and experienced instructors",
  heroButtonText: "Start Your Journey",
  heroBackgroundImage: "/images/hero-default.svg",
  aboutTitle: "Why Choose Our Studio?",
  aboutDescription: "We offer a wide range of dance classes for all skill levels, with expert instructors and a supportive community.",
  testimonialsEnabled: true,
  newsletterEnabled: true
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export async function OPTIONS(_: NextRequest) {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  try {
    console.log('[Homepage API] Starting request...')
    await ensureDbConnection()
    console.log('[Homepage API] Database connected')
    const rec = await prisma.homepageContent.findUnique({ where: { id: 'homepage' } })
    console.log('[Homepage API] Query result:', rec ? 'Found' : 'Not found')
    if (rec) {
      console.log('[Homepage API] Returning database content')
      return NextResponse.json({
        heroTitle: rec.heroTitle,
        heroSubtitle: rec.heroSubtitle,
        heroButtonText: rec.heroButtonText,
        heroBackgroundImage: rec.heroBackgroundImage,
        aboutTitle: rec.aboutTitle,
        aboutDescription: rec.aboutDescription,
        testimonialsEnabled: rec.testimonialsEnabled,
        newsletterEnabled: rec.newsletterEnabled,
      }, { headers: CORS_HEADERS })
    }
    console.log('[Homepage API] No record found, returning default')
    return NextResponse.json(DEFAULT_CONTENT, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('[Homepage API] Error:', error)
    console.error('[Homepage API] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(DEFAULT_CONTENT, { headers: CORS_HEADERS })
  }
}

export const revalidate = 0
