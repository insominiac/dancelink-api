import { NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

export async function GET() {
  try {
    await ensureDbConnection()
    const rec = await prisma.eventsPageContent.findUnique({ where: { id: 'events' } })
    return NextResponse.json(rec || {})
  } catch (error) {
    console.error('Error fetching events content:', error)
    return NextResponse.json({})
  }
}

export const revalidate = 0
