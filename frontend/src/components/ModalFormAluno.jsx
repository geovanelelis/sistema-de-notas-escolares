import { useEffect, useState } from 'react'

function ModalFormAluno({ isOpen, onClose, disciplinas }) {
  const [nomeAluno, setNomeAluno] = useState('')
  const [frequencia, setFrequencia] = useState('')
  const [notas, setNotas] = useState({})

  const cadastrarAluno = async (e) => {
    e.preventDefault()

    const alunoData = {
      nome: nomeAluno,
      frequencia: parseFloat(frequencia),
      notas: Object.entries(notas).map(([disciplinaId, valor]) => ({
        disciplinaId: parseInt(disciplinaId),
        valor,
      })),
    }

    try {
      const res = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData),
      })

      if (!res.ok) {
        throw new Error('Erro ao cadastrar aluno')
      }

      console.log('Aluno cadastrado com sucesso:', alunoData)
      alert('Aluno cadastrado com sucesso!')
      setNomeAluno('')
      setFrequencia('')
      setNotas({})
      onClose()
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error)
      alert('Erro ao cadastrar aluno. Tente novamente.')
    }
  }

  const handleClose = () => {
    setNomeAluno('')
    setFrequencia('')
    setNotas({})
    onClose()
  }

  const handleNotaChange = (disciplinaId, valor) => {
    setNotas((prev) => ({
      ...prev,
      [disciplinaId]: parseFloat(valor) || 0,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Aluno</h2>

          <form onSubmit={cadastrarAluno} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomeAluno" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Aluno
                </label>
                <input
                  type="text"
                  id="nomeAluno"
                  value={nomeAluno}
                  onChange={(e) => setNomeAluno(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="frequencia"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Frequência (%)
                </label>
                <input
                  type="number"
                  id="frequencia"
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Notas por Disciplina</h3>

              {disciplinas.length === 0 ? (
                <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  Nenhuma disciplina cadastrada ainda. Adicione disciplinas primeiro.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disciplinas.map((disciplina) => (
                    <div key={disciplina.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {disciplina.nome}
                      </label>
                      <input
                        type="number"
                        value={notas[disciplina.id] || ''}
                        onChange={(e) => handleNotaChange(disciplina.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0-10"
                        min="0"
                        max="10"
                        step="0.1"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={disciplinas.length === 0}
              >
                Salvar Aluno
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalFormAluno
