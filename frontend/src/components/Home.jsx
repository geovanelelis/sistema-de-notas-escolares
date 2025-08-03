import { useEffect, useState } from 'react'
import ModalFormDisciplina from './ModalFormDisciplina'
import ModalFormAluno from './ModalFormAluno'
import Resultados from './Resultados'

function Home() {
  const [isDisciplinaModalOpen, setIsDisciplinaModalOpen] = useState(false)
  const [isAlunoModalOpen, setIsAlunoModalOpen] = useState(false)
  const [disciplinas, setDisciplinas] = useState([])
  const [alunos, setAlunos] = useState([])
  const [showResultados, setShowResultados] = useState(false)
  const api = import.meta.env.VITE_API_URL

  const buscarDisciplinas = async () => {
    const res = await fetch(`${api}/disciplinas`)
    const data = await res.json()
    setDisciplinas(data)
  }

  const buscarAlunos = async () => {
    const res = await fetch(`${api}/alunos`)
    const data = await res.json()
    setAlunos(data)
  }

  useEffect(() => {
    buscarDisciplinas()
    buscarAlunos()
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ações Principais</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsDisciplinaModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Adicionar Disciplina
          </button>
          <button
            onClick={() => setIsAlunoModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Adicionar Aluno
          </button>
          <button
            onClick={() => setShowResultados(!showResultados)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {showResultados ? 'Ocultar Resultados' : 'Ver Resultados'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Disciplinas Cadastradas</h2>
        {disciplinas.length > 0 ? (
          <ul className="grid grid-cols-5 justify-between gap-4">
            {disciplinas.map((disciplina) => (
              <li key={disciplina.id} className="bg-gray-100 border border-gray-300 rounded-lg p-6">
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
        {alunos.length > 0 ? (
          <ul className="grid grid-cols-3 justify-between gap-4">
            {alunos.map((aluno) => (
              <li key={aluno.id} className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2 gap-4">
                  <span>
                    {aluno.nome} - Frequência: {aluno.frequencia}%
                  </span>
                  <button
                    className="px-2 py-0.5 rounded-lg bg-red-500 text-white cursor-pointer hover:opacity-85 transition-all duration-300"
                    onClick={() => alert('Funcionalidade de exclusão ainda não implementada')}
                  >
                    X
                  </button>
                </div>
                <ul className="list-inside list-disc mt-2">
                  {aluno.notas.map((nota) => (
                    <li key={nota.id}>
                      {nota.disciplina.nome}: {nota.valor}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center py-8">Nenhum aluno cadastrado ainda.</div>
        )}
      </div>

      {showResultados && (
        <Resultados
          alunos={alunos}
          disciplinas={disciplinas}
          buscarAlunos={buscarAlunos}
          buscarDisciplinas={buscarDisciplinas}
        />
      )}

      <ModalFormDisciplina
        isOpen={isDisciplinaModalOpen}
        onClose={() => setIsDisciplinaModalOpen(false)}
        buscarDisciplinas={buscarDisciplinas}
      />

      <ModalFormAluno
        isOpen={isAlunoModalOpen}
        onClose={() => setIsAlunoModalOpen(false)}
        buscarAlunos={buscarAlunos}
        disciplinas={disciplinas}
      />
    </div>
  )
}

export default Home
