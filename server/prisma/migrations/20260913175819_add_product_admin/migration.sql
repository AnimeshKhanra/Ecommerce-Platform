/*
  Warnings:

  - Added the required column `adminId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "adminId" TEXT;

UPDATE "Product"
SET "adminId" = 'cmovu0ytr0000lnark6mii9x4'
WHERE "adminId" IS NULL;

ALTER TABLE "Product"
ALTER COLUMN "adminId" SET NOT NULL;


-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
