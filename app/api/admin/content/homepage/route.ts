import { NextRequest, NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

const HOMEPAGE_ID = 'homepage'

export async function GET() {
  try {
    await ensureDbConnection()
    const rec = await prisma.homepageContent.findUnique({ where: { id: HOMEPAGE_ID } })
    if (rec) return NextResponse.json(rec)
    return NextResponse.json({})
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json({})
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureDbConnection()
    const content = await request.json()
    const saved = await prisma.homepageContent.upsert({
      where: { id: HOMEPAGE_ID },
      update: {
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        heroButtonText: content.heroButtonText ?? null,
        heroBackgroundImage: content.heroBackgroundImage ?? null,
        aboutTitle: content.aboutTitle ?? null,
        aboutDescription: content.aboutDescription ?? null,
        testimonialsEnabled: content.testimonialsEnabled ?? true,
        newsletterEnabled: content.newsletterEnabled ?? true,
      },
      create: {
        id: HOMEPAGE_ID,
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        heroButtonText: content.heroButtonText ?? null,
        heroBackgroundImage: content.heroBackgroundImage ?? null,
        aboutTitle: content.aboutTitle ?? null,
        aboutDescription: content.aboutDescription ?? null,
        testimonialsEnabled: content.testimonialsEnabled ?? true,
        newsletterEnabled: content.newsletterEnabled ?? true,
      },
    })

    return NextResponse.json({ success: true, updatedAt: saved.updatedAt })
  } catch (error) {
    console.error('Error updating homepage content:', error)
    return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return PUT(request)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
