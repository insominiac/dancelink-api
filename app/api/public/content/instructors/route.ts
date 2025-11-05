import { NextResponse } from 'next/server'
import prisma, { ensureDbConnection } from '@/app/lib/db'

export async function GET() {
  try {
    await ensureDbConnection()
    const rec = await prisma.instructorsPageContent.findUnique({ where: { id: 'instructors' } })
    return NextResponse.json(rec || {})
  } catch (error) {
    console.error('Error fetching instructors content:', error)
    return NextResponse.json({})
  }
}

export const revalidate = 0
