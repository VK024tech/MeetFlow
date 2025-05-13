-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "senderid" INTEGER NOT NULL,
    "receiverid" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverid_fkey" FOREIGN KEY ("receiverid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
