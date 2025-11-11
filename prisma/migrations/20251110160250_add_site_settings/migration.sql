-- CreateEnum
CREATE TYPE "SeatLockItemType" AS ENUM ('CLASS', 'EVENT');

-- CreateEnum
CREATE TYPE "SeatLockStatus" AS ENUM ('ACTIVE', 'RELEASED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CompetitionRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "seat_locks" (
    "id" TEXT NOT NULL,
    "itemType" "SeatLockItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "SeatLockStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "bookingId" TEXT,

    CONSTRAINT "seat_locks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academies" (
    "id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "city" TEXT,
    "country" TEXT,
    "logo_url" TEXT,
    "status" "VenueStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competition_requests" (
    "id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "venue_id" TEXT,
    "description" TEXT,
    "expected_participants" INTEGER,
    "status" "CompetitionRequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competition_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "site_name" TEXT NOT NULL,
    "site_description" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "social_media" JSONB,
    "footer" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homepage_content" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroButtonText" TEXT,
    "heroBackgroundImage" TEXT,
    "aboutTitle" TEXT,
    "aboutDescription" TEXT,
    "testimonialsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newsletterEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepage_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_page_content" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "heroBadgeText" TEXT,
    "statsTitle" TEXT,
    "statsDescription" TEXT,
    "storyTitle" TEXT,
    "storyDescription1" TEXT,
    "storyDescription2" TEXT,
    "whyChooseUsTitle" TEXT,
    "heroFeatures" JSONB,
    "stats" JSONB,
    "features" JSONB,
    "newsletterTitle" TEXT,
    "newsletterDescription" TEXT,
    "newsletterBenefits" JSONB,
    "ctaTitle" TEXT,
    "ctaDescription" TEXT,
    "ctaBadgeText" TEXT,
    "ctaButtons" JSONB,
    "ctaFeatures" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_page_content" (
    "id" TEXT NOT NULL,
    "heroBadgeText" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "featuredTitle" TEXT,
    "featuredDescription" TEXT,
    "searchTitle" TEXT,
    "searchDescription" TEXT,
    "ctaBadgeText" TEXT,
    "ctaTitle" TEXT,
    "ctaDescription" TEXT,
    "heroFeatures" JSONB,
    "ctaButtons" JSONB,
    "ctaFeatures" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors_page_content" (
    "id" TEXT NOT NULL,
    "heroBadgeText" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "statsSection" JSONB,
    "noInstructorsSection" JSONB,
    "errorSection" JSONB,
    "ctaSection" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructors_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_page_content" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "sections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "seat_locks_itemType_itemId_idx" ON "seat_locks"("itemType", "itemId");

-- CreateIndex
CREATE INDEX "seat_locks_status_expiresAt_idx" ON "seat_locks"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "seat_locks_bookingId_idx" ON "seat_locks"("bookingId");

-- CreateIndex
CREATE INDEX "academies_host_id_idx" ON "academies"("host_id");

-- CreateIndex
CREATE INDEX "academies_status_idx" ON "academies"("status");

-- CreateIndex
CREATE INDEX "competition_requests_host_id_idx" ON "competition_requests"("host_id");

-- CreateIndex
CREATE INDEX "competition_requests_status_idx" ON "competition_requests"("status");

-- AddForeignKey
ALTER TABLE "academies" ADD CONSTRAINT "academies_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "hosts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_requests" ADD CONSTRAINT "competition_requests_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "hosts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_requests" ADD CONSTRAINT "competition_requests_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;
