import { PrismaClient } from '../../backend/generated/prisma/index.js'
const prisma = new PrismaClient()

async function getDisciplina() {
  const disciplina = await prisma.disciplina.findMany()
  console.log(disciplina)
}

getDisciplina()
