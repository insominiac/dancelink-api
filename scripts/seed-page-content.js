const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedPageContent() {
  console.log('🌱 Seeding CMS page content...')
  
  try {
    // Clear existing page content
    console.log('🧹 Clearing existing page content...')
    await prisma.homepageContent.deleteMany({})
    await prisma.aboutPageContent.deleteMany({})
    await prisma.eventsPageContent.deleteMany({})
    await prisma.instructorsPageContent.deleteMany({})
    await prisma.contactPageContent.deleteMany({})
    
    // ================== HOMEPAGE CONTENT ==================
    console.log('🏠 Creating homepage content...')
    const homepageContent = await prisma.homepageContent.create({
      data: {
        heroTitle: "Discover the Joy of Dance",
        heroSubtitle: "Join our vibrant community of dancers and unlock your potential with expert instruction",
        heroButtonText: "Explore Classes",
        heroBackgroundImage: "/images/hero/dance-studio.jpg",
        aboutTitle: "Why Choose DanceLink?",
        aboutDescription: "We're passionate about making dance accessible to everyone, regardless of age or experience level.",
        testimonialsEnabled: true,
        newsletterEnabled: true
      }
    })
    console.log('✅ Created homepage content')
    
    // ================== ABOUT PAGE CONTENT ==================
    console.log('👥 Creating about page content...')
    const aboutPageContent = await prisma.aboutPageContent.create({
      data: {
        heroTitle: "About DanceLink",
        heroSubtitle: "Connecting dancers through the universal language of movement.",
        heroBadgeText: "Our Story & Mission",
        statsTitle: "Our Impact in Numbers",
        statsDescription: "See how we're making a difference in the dance community",
        storyTitle: "Our Story",
        storyDescription1: "Founded with a belief that dance should be accessible to all.",
        storyDescription2: "Our mission is to make dance welcoming and transformative for everyone.",
        whyChooseUsTitle: "Why Choose DanceLink?",
        heroFeatures: {
          "en": [
            { icon: "🌟", text: "Award-winning platform" },
            { icon: "💃", text: "Expert instructors" },
            { icon: "❤️", text: "Passionate community" }
          ]
        },
        stats: {
          "en": [
            { number: "500+", label: "Happy Students", description: "And growing daily", color: "purple" },
            { number: "15+", label: "Dance Styles", description: "From ballet to hip-hop", color: "pink" },
            { number: "20+", label: "Expert Instructors", description: "Professional & certified", color: "purple" },
            { number: "5", label: "Studio Locations", description: "Across the city", color: "pink" }
          ]
        },
        features: {
          "en": [
            { icon: "🏅️", title: "Award-winning instructors", description: "Learn from certified professionals", bgColor: "purple" },
            { icon: "🏢", title: "State-of-the-art studios", description: "Modern facilities", bgColor: "pink" },
            { icon: "👥", title: "Welcoming community", description: "Supportive network", bgColor: "purple" },
            { icon: "📈", title: "Proven results", description: "Track your progress", bgColor: "pink" }
          ]
        },
        newsletterTitle: "Stay in the Loop!",
        newsletterDescription: "Get exclusive access to new classes and events.",
        newsletterBenefits: {
          "en": [
            { icon: "🎁", text: "Weekly Tips" },
            { icon: "🎉", text: "Exclusive Events" },
            { icon: "💰", text: "Special Discounts" }
          ]
        },
        ctaTitle: "Ready to Begin Your Dance Journey?",
        ctaDescription: "Join hundreds who have transformed through movement.",
        ctaBadgeText: "Start Your Journey",
        ctaButtons: {
          "en": {
            primary: { text: "🎁 Start Free Trial", href: "/contact" },
            secondary: { text: "👀 Browse All Classes", href: "/classes" }
          }
        },
        ctaFeatures: {
          "en": [
            { icon: "✅", title: "No Experience Needed", description: "Perfect for beginners" },
            { icon: "📅", title: "Flexible Scheduling", description: "Fits your lifestyle" },
            { icon: "💰", title: "Money-back Guarantee", description: "100% satisfaction" }
          ]
        }
      }
    })
    console.log('✅ Created about page content')
    
    // ================== EVENTS PAGE CONTENT ==================
    console.log('🎪 Creating events page content...')
    const eventsPageContent = await prisma.eventsPageContent.create({
      data: {
        heroBadgeText: "Experience the Magic of Dance",
        heroTitle: "Upcoming Events",
        heroSubtitle: "Workshops, socials, and competitions",
        featuredTitle: "Featured Events",
        featuredDescription: "Don't miss these exclusive events",
        searchTitle: "Find Your Perfect Event",
        searchDescription: "Filter by type, date, and budget",
        heroFeatures: {
          "en": [
            { icon: "🎪", text: "Exclusive events" },
            { icon: "🏆", text: "World-class performances" },
            { icon: "✨", text: "Unforgettable experiences" }
          ]
        },
        ctaBadgeText: "Join the Experience",
        ctaTitle: "Ready to Dance?",
        ctaDescription: "Book early and join our vibrant community",
        ctaButtons: {
          "en": {
            primary: { text: "🎫 Reserve Your Spot", href: "/contact" },
            secondary: { text: "📞 Get Event Updates", href: "/contact" }
          }
        },
        ctaFeatures: {
          "en": [
            { icon: "🎯", title: "Early Bird Discounts", description: "Save up to 25%" },
            { icon: "🎆", title: "VIP Experience", description: "Front row + meet & greets" },
            { icon: "🎁", title: "Group Packages", description: "Special group rates" }
          ]
        }
      }
    })
    console.log('✅ Created events page content')
    
    // ================== INSTRUCTORS PAGE CONTENT ==================
    console.log('👨‍🏫 Creating instructors page content...')
    const instructorsPageContent = await prisma.instructorsPageContent.create({
      data: {
        heroBadgeText: "Our Expert Team",
        heroTitle: "Instructors",
        heroSubtitle: "Meet the professionals behind our classes",
        statsSection: {
          "en": {
            title: "Our Teaching Excellence",
            subtitle: "Diverse team of professionals with unique expertise",
            labels: {
              instructorsLabel: "Expert Instructors",
              classesLabel: "Active Classes",
              experienceLabel: "Years Experience"
            }
          }
        },
        noInstructorsSection: {
          "en": {
            icon: "👨‍🏫",
            title: "No Instructors Available",
            subtitle: "We're updating instructor profiles. Check back soon!",
            buttonText: "View Classes",
            buttonHref: "/classes"
          }
        },
        errorSection: {
          "en": {
            icon: "⚠️",
            subtitle: "Please try again later.",
            buttonText: "Try Again"
          }
        },
        ctaSection: {
          "en": {
            badgeText: "Join Our Team",
            title: "Become an Instructor",
            subtitle: "Share your passion and grow with us",
            buttons: [
              { text: "Apply Now", href: "/contact", isPrimary: true },
              { text: "Learn More", href: "/about", isPrimary: false }
            ],
            features: [
              { icon: "🎓", title: "Professional Growth", description: "Training and resources" },
              { icon: "💼", title: "Flexible Schedule", description: "Work on your time" }
            ]
          }
        }
      }
    })
    console.log('✅ Created instructors page content')
    
    // ================== CONTACT PAGE CONTENT ==================
    console.log('📞 Creating contact page content...')
    const contactPageContent = await prisma.contactPageContent.create({
      data: {
        heroTitle: "📞 Get in Touch",
        heroSubtitle: "Ready to start dancing? We're here to help!",
        sections: {
          "en": {
            quickOptions: [
              { icon: "🎁", title: "Book Free Trial", description: "Try any class for free", buttonText: "Book Now", buttonHref: "tel:+1234567890" },
              { icon: "💬", title: "Live Chat", description: "Instant answers", buttonText: "Chat Now", buttonHref: "#chat" }
            ],
            faqs: [
              { question: "Do I need experience?", answer: "Not at all! We welcome beginners." },
              { question: "What should I wear?", answer: "Comfortable, easy-to-move clothing." }
            ]
          }
        }
      }
    })
    console.log('✅ Created contact page content')
    
    console.log('\n🎉 CMS page content seeded successfully!')
    console.log('\n📊 Summary:')
    console.log('='.repeat(30))
    console.log('🏠 Homepage Content: 1 record')
    console.log('👥 About Page Content: 1 record')
    console.log('🎪 Events Page Content: 1 record')
    console.log('👨‍🏫 Instructors Page Content: 1 record')
    console.log('📞 Contact Page Content: 1 record')
    
  } catch (error) {
    console.error('❌ Error seeding CMS page content:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedPageContent()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })