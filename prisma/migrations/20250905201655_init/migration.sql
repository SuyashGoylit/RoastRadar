-- CreateTable
CREATE TABLE "public"."Coffee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roaster" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "roastLevel" TEXT NOT NULL,
    "bitterness" TEXT NOT NULL,
    "acidity" TEXT NOT NULL,
    "origin" JSONB NOT NULL,
    "processing" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchaseEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coffeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CoffeeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CoffeeToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "_CoffeeToUser_B_index" ON "public"."_CoffeeToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."PurchaseEvent" ADD CONSTRAINT "PurchaseEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseEvent" ADD CONSTRAINT "PurchaseEvent_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "public"."Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CoffeeToUser" ADD CONSTRAINT "_CoffeeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CoffeeToUser" ADD CONSTRAINT "_CoffeeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
