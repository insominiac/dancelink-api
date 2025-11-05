import { NextRequest, NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

// Default instructors content
const DEFAULT_CONTENT = {
  heroTitle: "Meet Our Expert Instructors",
  heroSubtitle: "Learn from passionate professionals with years of experience",
  heroButtonText: "View All Instructors",
  featuredInstructorsEnabled: true,
  instructorProfilesEnabled: true,
  specialtiesEnabled: true
}

export async function GET() {
  try {
    await ensureDbConnection()
    const rec = await prisma.instructorsPageContent.findUnique({ where: { id: 'instructors' } })
    return NextResponse.json(rec || DEFAULT_CONTENT)
  } catch (error) {
    console.error('Error fetching instructors content:', error)
    return NextResponse.json(DEFAULT_CONTENT)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureDbConnection()
    const content = await request.json()
    const saved = await prisma.instructorsPageContent.upsert({
      where: { id: 'instructors' },
      update: {
        heroBadgeText: content.heroBadgeText ?? null,
        heroTitle: content.heroTitle ?? null,
        heroSubtitle: content.heroSubtitle ?? null,
        statsSection: content.statsSection ?? null,
        noInstructorsSection: content.noInstructorsSection ?? null,
        errorSection: content.errorSection ?? null,
        ctaSection: content.ctaSection ?? null,
      },
      create: {
        id: 'instructors',
        heroBadgeText: content.heroBadgeText ?? null,
        heroTitle: content.heroTitle ?? null,
        heroSubtitle: content.heroSubtitle ?? null,
        statsSection: content.statsSection ?? null,
        noInstructorsSection: content.noInstructorsSection ?? null,
        errorSection: content.errorSection ?? null,
        ctaSection: content.ctaSection ?? null,
      },
    })

    return NextResponse.json({ success: true, updatedAt: saved.updatedAt })
  } catch (error) {
    console.error('Error updating instructors content:', error)
    return NextResponse.json({ error: 'Failed to update instructors content' }, { status: 500 })
  }
}
