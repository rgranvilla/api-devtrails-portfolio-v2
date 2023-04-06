-- CreateTable
CREATE TABLE "user-tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user-tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-tokens_refresh_token_key" ON "user-tokens"("refresh_token");

-- AddForeignKey
ALTER TABLE "user-tokens" ADD CONSTRAINT "user-tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
