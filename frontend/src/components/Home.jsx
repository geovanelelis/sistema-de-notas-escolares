import { useEffect, useState } from 'react'
import ModalFormDisciplina from './ModalFormDisciplina'
import ModalFormAluno from './ModalFormAluno'

function Home() {
  const [isDisciplinaModalOpen, setIsDisciplinaModalOpen] = useState(false)
  const [isAlunoModalOpen, setIsAlunoModalOpen] = useState(false)
  const [disciplinas, setDisciplinas] = useState([])

  const buscarDisciplinas = async () => {
    const res = await fetch('http://localhost:3000/disciplinas')
    const data = await res.json()
    setDisciplinas(data)
  }

  useEffect(() => {
    buscarDisciplinas()
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ações Principais</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsDisciplinaModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Adicionar Disciplina
          </button>
          <button
            onClick={() => setIsAlunoModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Adicionar Aluno
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Disciplinas Cadastradas</h2>
        {disciplinas.length > 0 ? (
          <ul className="list-disc pl-6">
            {disciplinas.map((disciplina) => (
              <li key={disciplina.id} className="text-gray-700">
                {disciplina.nome}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center py-8">Nenhuma disciplina cadastrada ainda.</div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Alunos Cadastrados</h2>
        <div className="text-gray-500 text-center py-8">Nenhum aluno cadastrado ainda.</div>
      </div>

      <ModalFormDisciplina
        isOpen={isDisciplinaModalOpen}
        onClose={() => setIsDisciplinaModalOpen(false)}
        buscarDisciplinas={buscarDisciplinas}
      />

      <ModalFormAluno
        isOpen={isAlunoModalOpen}
        onClose={() => setIsAlunoModalOpen(false)}
        disciplinas={disciplinas}
      />
    </div>
  )
}

export default Home
