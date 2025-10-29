'use client'

import { useEffect } from 'react'
import Head from 'next/head'

interface SEOHeadProps {
  path: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackImage?: string
}

// Fetch SEO data from API
export async function fetchSeoData(path: string) {
  try {
    const res = await fetch(`/api/seo?path=${encodeURIComponent(path)}`)
    if (res.ok) {
      const data = await res.json()
      return data.seo
    }
  } catch (error) {
    console.error('Error fetching SEO data:', error)
  }
  return null
}

// Generate metadata object (for server-side use)
export function generateMetadata(path: string, seoData?: any) {
  if (!seoData) {
    return {
      title: 'DanceLink - Connect, Learn, Dance',
      description: 'Professional dance classes and events platform'
    }
  }

  const title = seoData.title || seoData.ogTitle || 'DanceLink - Connect, Learn, Dance'
  const description = seoData.description || seoData.ogDescription || 'Professional dance classes and events platform'
  const images = seoData.ogImage ? [{ url: seoData.ogImage }] : []

  let other: Record<string, string> | undefined
  try {
    if (seoData.customMeta) {
      const arr = typeof seoData.customMeta === 'string' ? JSON.parse(seoData.customMeta) : seoData.customMeta
      other = arr.reduce((acc: any, meta: any) => {
        if (meta?.name && meta?.content) acc[meta.name] = meta.content
        return acc
      }, {})
    }
  } catch {}

  return {
    title,
    description,
    keywords: seoData.keywords,
    authors: seoData.author ? [{ name: seoData.author }] : undefined,
    robots: seoData.robots || 'index,follow',
    alternates: seoData.canonical ? { canonical: seoData.canonical } : undefined,
    openGraph: {
      title: seoData.ogTitle || title,
      description: seoData.ogDescription || description,
      type: seoData.ogType || 'website',
      url: seoData.ogUrl,
      images,
      siteName: 'DanceLink - Connect, Learn, Dance'
    },
    twitter: {
      card: seoData.twitterCard || 'summary_large_image',
      title: seoData.twitterTitle || seoData.ogTitle || title,
      description: seoData.twitterDescription || seoData.ogDescription || description,
      images: seoData.twitterImage ? [seoData.twitterImage] : images.map((img: any) => img.url),
      creator: seoData.twitterCreator
    },
    other
  }
}

// Client-side component for dynamic SEO
export default function SEOHead({ path, fallbackTitle, fallbackDescription, fallbackImage }: SEOHeadProps) {
  useEffect(() => {
    const updateMetaTags = async () => {
      const seoData = await fetchSeoData(path)
      
      const title = seoData?.title || fallbackTitle || 'DanceLink - Connect, Learn, Dance'
      const description = seoData?.description || fallbackDescription || 'Professional dance classes and events platform'
      
      // Update document title
      document.title = title
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
      
      // Update Open Graph tags
      if (seoData?.ogTitle || fallbackTitle) {
        let ogTitle = document.querySelector('meta[property="og:title"]')
        if (!ogTitle) {
          ogTitle = document.createElement('meta')
          ogTitle.setAttribute('property', 'og:title')
          document.head.appendChild(ogTitle)
        }
        ogTitle.setAttribute('content', seoData?.ogTitle || fallbackTitle || title)
      }
      
      if (seoData?.ogDescription || fallbackDescription) {
        let ogDesc = document.querySelector('meta[property="og:description"]')
        if (!ogDesc) {
          ogDesc = document.createElement('meta')
          ogDesc.setAttribute('property', 'og:description')
          document.head.appendChild(ogDesc)
        }
        ogDesc.setAttribute('content', seoData?.ogDescription || fallbackDescription || description)
      }
      
      if (seoData?.ogImage || fallbackImage) {
        let ogImage = document.querySelector('meta[property="og:image"]')
        if (!ogImage) {
          ogImage = document.createElement('meta')
          ogImage.setAttribute('property', 'og:image')
          document.head.appendChild(ogImage)
        }
        ogImage.setAttribute('content', seoData?.ogImage || fallbackImage || '')
      }
    }
    
    updateMetaTags()
  }, [path, fallbackTitle, fallbackDescription, fallbackImage])

  return null
}
