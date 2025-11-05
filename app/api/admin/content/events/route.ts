import { NextRequest, NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

// Default events content
const DEFAULT_CONTENT = {
  heroTitle: "Dance Events & Workshops",
  heroSubtitle: "Discover exciting dance events, workshops, and performances",
  heroButtonText: "View All Events",
  featuredEventsEnabled: true,
  upcomingEventsEnabled: true,
  eventCategoriesEnabled: true
}

export async function GET() {
  try {
    await ensureDbConnection()
    const rec = await prisma.eventsPageContent.findUnique({ where: { id: 'events' } })
    return NextResponse.json(rec || DEFAULT_CONTENT)
  } catch (error) {
    console.error('Error fetching events content:', error)
    return NextResponse.json(DEFAULT_CONTENT)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureDbConnection()
    const content = await request.json()
    const saved = await prisma.eventsPageContent.upsert({
      where: { id: 'events' },
      update: {
        heroBadgeText: content.heroBadgeText ?? null,
        heroTitle: content.heroTitle ?? null,
        heroSubtitle: content.heroSubtitle ?? null,
        featuredTitle: content.featuredTitle ?? null,
        featuredDescription: content.featuredDescription ?? null,
        searchTitle: content.searchTitle ?? null,
        searchDescription: content.searchDescription ?? null,
        ctaBadgeText: content.ctaBadgeText ?? null,
        ctaTitle: content.ctaTitle ?? null,
        ctaDescription: content.ctaDescription ?? null,
        heroFeatures: content.heroFeatures ?? null,
        ctaButtons: content.ctaButtons ?? null,
        ctaFeatures: content.ctaFeatures ?? null,
      },
      create: {
        id: 'events',
        heroBadgeText: content.heroBadgeText ?? null,
        heroTitle: content.heroTitle ?? null,
        heroSubtitle: content.heroSubtitle ?? null,
        featuredTitle: content.featuredTitle ?? null,
        featuredDescription: content.featuredDescription ?? null,
        searchTitle: content.searchTitle ?? null,
        searchDescription: content.searchDescription ?? null,
        ctaBadgeText: content.ctaBadgeText ?? null,
        ctaTitle: content.ctaTitle ?? null,
        ctaDescription: content.ctaDescription ?? null,
        heroFeatures: content.heroFeatures ?? null,
        ctaButtons: content.ctaButtons ?? null,
        ctaFeatures: content.ctaFeatures ?? null,
      },
    })
    return NextResponse.json({ success: true, updatedAt: saved.updatedAt })
  } catch (error) {
    console.error('Error updating events content:', error)
    return NextResponse.json({ error: 'Failed to update events content' }, { status: 500 })
  }
}
