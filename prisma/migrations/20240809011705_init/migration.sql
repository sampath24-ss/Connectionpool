-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
