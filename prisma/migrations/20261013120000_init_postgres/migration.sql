-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "evolution" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapturedPokemon" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "pokemonName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "types" TEXT NOT NULL,
    "baseExperience" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CapturedPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CapturedPokemon_trainerId_idx" ON "CapturedPokemon"("trainerId");

-- AddForeignKey
ALTER TABLE "CapturedPokemon" ADD CONSTRAINT "CapturedPokemon_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
