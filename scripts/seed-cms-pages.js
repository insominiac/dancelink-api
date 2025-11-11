// Seed demo content for About, Events, Instructors, Contact into SiteSettings.footer
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const SETTINGS_ID = 'site-settings'

  const about = {
    heroTitle: 'About DanceLink',
    heroSubtitle: 'Connecting dancers through the universal language of movement.',
    heroBadgeText: 'Our Story & Mission',
    heroFeatures: [
      { icon: '🌟', text: 'Award-winning platform' },
      { icon: '💃', text: 'Expert instructors' },
      { icon: '❤️', text: 'Passionate community' },
    ],
    statsTitle: 'Our Impact in Numbers',
    statsDescription: "See how we're making a difference in the dance community",
    stats: [
      { number: '500+', label: 'Happy Students', description: 'And growing daily', color: 'purple' },
      { number: '15+', label: 'Dance Styles', description: 'From ballet to hip-hop', color: 'pink' },
      { number: '20+', label: 'Expert Instructors', description: 'Professional & certified', color: 'purple' },
      { number: '5', label: 'Studio Locations', description: 'Across the city', color: 'pink' },
    ],
    storyTitle: 'Our Story',
    storyDescription1: 'Founded with a belief that dance should be accessible to all.',
    storyDescription2: "Our mission is to make dance welcoming and transformative for everyone.",
    whyChooseUsTitle: 'Why Choose DanceLink?',
    features: [
      { icon: '🏅️', title: 'Award-winning instructors', description: 'Learn from certified professionals', bgColor: 'purple' },
      { icon: '🏢', title: 'State-of-the-art studios', description: 'Modern facilities', bgColor: 'pink' },
      { icon: '👥', title: 'Welcoming community', description: 'Supportive network', bgColor: 'purple' },
      { icon: '📈', title: 'Proven results', description: 'Track your progress', bgColor: 'pink' },
    ],
    newsletterTitle: 'Stay in the Loop!',
    newsletterDescription: 'Get exclusive access to new classes and events.',
    newsletterBenefits: [
      { icon: '🎁', text: 'Weekly Tips' },
      { icon: '🎉', text: 'Exclusive Events' },
      { icon: '💰', text: 'Special Discounts' },
    ],
    ctaTitle: 'Ready to Begin Your Dance Journey?',
    ctaDescription: 'Join hundreds who have transformed through movement.',
    ctaBadgeText: 'Start Your Journey',
    ctaButtons: {
      primary: { text: '🎁 Start Free Trial', href: '/contact' },
      secondary: { text: '👀 Browse All Classes', href: '/classes' },
    },
    ctaFeatures: [
      { icon: '✅', title: 'No Experience Needed', description: 'Perfect for beginners' },
      { icon: '📅', title: 'Flexible Scheduling', description: 'Fits your lifestyle' },
      { icon: '💰', title: 'Money-back Guarantee', description: '100% satisfaction' },
    ],
  }

  const events = {
    heroBadgeText: 'Experience the Magic of Dance',
    heroTitle: 'Upcoming Events',
    heroSubtitle: 'Workshops, socials, and competitions',
    heroFeatures: [
      { icon: '🎪', text: 'Exclusive events' },
      { icon: '🏆', text: 'World-class performances' },
      { icon: '✨', text: 'Unforgettable experiences' },
    ],
    featuredTitle: 'Featured Events',
    featuredDescription: "Don't miss these exclusive events",
    searchTitle: 'Find Your Perfect Event',
    searchDescription: 'Filter by type, date, and budget',
    ctaBadgeText: 'Join the Experience',
    ctaTitle: 'Ready to Dance?',
    ctaDescription: 'Book early and join our vibrant community',
    ctaButtons: {
      primary: { text: '🎫 Reserve Your Spot', href: '/contact' },
      secondary: { text: '📞 Get Event Updates', href: '/contact' },
    },
    ctaFeatures: [
      { icon: '🎯', title: 'Early Bird Discounts', description: 'Save up to 25%' },
      { icon: '🎆', title: 'VIP Experience', description: 'Front row + meet & greets' },
      { icon: '🎁', title: 'Group Packages', description: 'Special group rates' },
    ],
  }

  const instructors = {
    heroBadgeText: 'Our Expert Team',
    heroTitle: 'Instructors',
    heroSubtitle: 'Meet the professionals behind our classes',
    statsSection: {
      title: 'Our Teaching Excellence',
      subtitle: 'Diverse team of professionals with unique expertise',
      labels: {
        instructorsLabel: 'Expert Instructors',
        classesLabel: 'Active Classes',
        experienceLabel: 'Years Experience',
      },
    },
    noInstructorsSection: {
      icon: '👨‍🏫',
      title: 'No Instructors Available',
      subtitle: "We're updating instructor profiles. Check back soon!",
      buttonText: 'View Classes',
      buttonHref: '/classes',
    },
    errorSection: {
      icon: '⚠️',
      subtitle: 'Please try again later.',
      buttonText: 'Try Again',
    },
    ctaSection: {
      badgeText: 'Join Our Team',
      title: 'Become an Instructor',
      subtitle: 'Share your passion and grow with us',
      buttons: [
        { text: 'Apply Now', href: '/contact', isPrimary: true },
        { text: 'Learn More', href: '/about', isPrimary: false },
      ],
      features: [
        { icon: '🎓', title: 'Professional Growth', description: 'Training and resources' },
        { icon: '💼', title: 'Flexible Schedule', description: 'Work on your time' },
      ],
    },
  }

  const contact = {
    heroTitle: '📞 Get in Touch',
    heroSubtitle: "Ready to start dancing? We're here to help!",
    sections: {
      quickOptions: [
        { icon: '🎁', title: 'Book Free Trial', description: "Try any class for free", buttonText: 'Book Now', buttonHref: 'tel:+1234567890' },
        { icon: '💬', title: 'Live Chat', description: 'Instant answers', buttonText: 'Chat Now', buttonHref: '#chat' },
      ],
      faqs: [
        { question: 'Do I need experience?', answer: 'Not at all! We welcome beginners.' },
        { question: 'What should I wear?', answer: 'Comfortable, easy-to-move clothing.' },
      ],
    },
  }

  try {
    const latest = await prisma.siteSettings.findFirst({ orderBy: { createdAt: 'desc' } })
    const footer = (latest?.footer || {})
    footer.about = about
    footer.events = events
    footer.instructors = instructors
    footer.contact = contact

    const saved = await prisma.siteSettings.upsert({
      where: { id: latest?.id || SETTINGS_ID },
      update: { footer, updatedAt: new Date() },
      create: {
        id: SETTINGS_ID,
        siteName: 'DanceLink',
        siteDescription: 'Public site settings',
        contactEmail: 'info@dancelink.com',
        footer,
      },
    })
    console.log('Seeded footer keys:', Object.keys(footer))
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
