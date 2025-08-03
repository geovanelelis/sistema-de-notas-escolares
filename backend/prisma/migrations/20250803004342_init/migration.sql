-- CreateTable
CREATE TABLE "public"."Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "frequencia" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Nota" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "public"."Disciplina"("nome");

-- AddForeignKey
ALTER TABLE "public"."Nota" ADD CONSTRAINT "Nota_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "public"."Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Nota" ADD CONSTRAINT "Nota_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
