import express from 'express'
import { prisma } from './db.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: {
        notas: {
          include: {
            disciplina: true,
          },
        },
      },
    })
    res.json(alunos)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' })
  }
})

app.post('/alunos', async (req, res) => {
  const { nome, frequencia, notas } = req.body

  if (!nome || !frequencia || !Array.isArray(notas)) {
    return res.status(400).json({ error: 'Dados inválidos' })
  }

  try {
    const aluno = await prisma.aluno.create({
      data: { nome, frequencia },
    })

    const notasCriadas = await Promise.all(
      notas.map((nota) =>
        prisma.nota.create({
          data: {
            valor: nota.valor,
            alunoId: aluno.id,
            disciplinaId: nota.disciplinaId,
          },
        })
      )
    )

    res.status(201).json({ aluno, notas: notasCriadas })
  } catch {
    res.status(500).json({ error: 'Erro ao criar aluno' })
  }
})

app.get('/disciplinas', async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany()
    res.json(disciplinas)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar disciplinas' })
  }
})

app.post('/disciplinas', async (req, res) => {
  const { nome } = req.body
  if (!nome) return res.status(400).json({ error: 'Nome obrigatório' })

  try {
    const novaDisciplina = await prisma.disciplina.create({ data: { nome } })
    res.status(201).json(novaDisciplina)
  } catch {
    res.status(500).json({ error: 'Erro ao criar disciplina' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
