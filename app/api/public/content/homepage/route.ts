import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Content file path
const CONTENT_FILE = path.join(process.cwd(), 'data', 'homepage-content.json')

// Default homepage content
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
  'Access-Control-Allow-Origin': 'https://dancelink-liart.vercel.app',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export async function OPTIONS(_: NextRequest) {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  try {
    // Try to read existing content
    try {
      const content = await fs.readFile(CONTENT_FILE, 'utf-8')
      return NextResponse.json(JSON.parse(content), { headers: CORS_HEADERS })
    } catch {
      // If file doesn't exist, return default content
      return NextResponse.json(DEFAULT_CONTENT, { headers: CORS_HEADERS })
    }
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    // Return default content if there's any error
    return NextResponse.json(DEFAULT_CONTENT, { headers: CORS_HEADERS })
  }
}

// Add caching headers for better performance
export const revalidate = 300 // Revalidate every 5 minutes