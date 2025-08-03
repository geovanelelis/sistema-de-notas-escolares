import { useState } from 'react'

function ModalFormDisciplina({ isOpen, onClose, buscarDisciplinas }) {
  const [nomeDisciplina, setNomeDisciplina] = useState('')

  const criarDisciplina = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeDisciplina }),
      })
      if (!res.ok) {
        throw new Error('Erro ao criar disciplina')
      }
      console.log('Disciplina salva:', nomeDisciplina)
      alert('Disciplina salva: ' + nomeDisciplina)
      setNomeDisciplina('')
      buscarDisciplinas()
      onClose()
    } catch (error) {
      console.error('Erro ao criar disciplina:', error)
      alert('Erro ao criar disciplina. Tente novamente.')
    }
  }

  const handleClose = () => {
    setNomeDisciplina('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Disciplina</h2>

          <form onSubmit={criarDisciplina} className="space-y-4">
            <div>
              <label
                htmlFor="nomeDisciplina"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome da Disciplina
              </label>
              <input
                type="text"
                id="nomeDisciplina"
                value={nomeDisciplina}
                onChange={(e) => setNomeDisciplina(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Matemática"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalFormDisciplina
