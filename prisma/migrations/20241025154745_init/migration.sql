-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_logo" TEXT,
    "description" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apply_url" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT,
    "job_type" TEXT,
    "salary" TEXT,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
