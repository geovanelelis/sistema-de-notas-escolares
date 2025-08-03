import { useEffect, useState } from 'react'

function Resultados({ alunos, disciplinas, buscarAlunos, buscarDisciplinas }) {
  useEffect(() => {
    buscarDisciplinas()
    buscarAlunos()
  }, [])

  const calcularMediaAluno = (alunoId) => {
    const aluno = alunos.find((a) => a.id === alunoId)
    if (!aluno || aluno.notas.length === 0) return 0
    const total = aluno.notas.reduce((acc, nota) => acc + nota.valor, 0)
    return total / aluno.notas.length
  }

  const mediaGeralDaTurma =
    alunos.reduce((acc, aluno) => {
      const media = calcularMediaAluno(aluno.id)
      return acc + media
    }, 0) / alunos.length || 0

  const calcularMediaPorDisciplina = (disciplinaId) => {
    const notas = alunos.flatMap((aluno) =>
      aluno.notas.filter((nota) => nota.disciplinaId === disciplinaId)
    )
    if (notas.length === 0) return 0
    const total = notas.reduce((acc, nota) => acc + nota.valor, 0)
    return total / notas.length
  }

  const alunosAcimaDaMedia = alunos.filter((aluno) => {
    const media = calcularMediaAluno(aluno.id)
    return media > mediaGeralDaTurma
  })

  const alunosComFrequenciaBaixa = alunos.filter((aluno) => aluno.frequencia < 75)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Resultados e Análises</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Lista de Alunos</h3>
          {alunos.length === 0 ? (
            <div className="text-gray-500 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
              Nenhum aluno cadastrado ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Média das Notas
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Frequência (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id}>
                      <td className="border border-gray-300 px-4 py-2">{aluno.nome}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {calcularMediaAluno(aluno.id).toFixed(1) || '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {aluno.frequencia}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Média da Turma por Disciplina</h3>
          {disciplinas.length === 0 ? (
            <div className="text-gray-500 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
              Nenhuma disciplina cadastrada ainda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disciplinas.map((disciplina) => (
                <div
                  key={disciplina.id}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <h4 className="font-medium text-blue-800">{disciplina.nome}</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    {calcularMediaPorDisciplina(disciplina.id).toFixed(1) || '0.0'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Alunos com Média Acima da Média Geral da Turma ({mediaGeralDaTurma.toFixed(1)})
          </h3>
          {alunosAcimaDaMedia.length === 0 ? (
            <div className="text-gray-500 text-center py-6 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
              Nenhum aluno com média acima da média geral da turma.
            </div>
          ) : (
            <div className="space-y-2">
              {alunosAcimaDaMedia.map((aluno) => (
                <div key={aluno.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">{aluno.nome}</span>
                    <span className="text-green-600 font-bold">
                      Média: {calcularMediaAluno(aluno.id).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Alunos com Frequência Abaixo de 75% (Atenção Especial)
          </h3>
          {alunosComFrequenciaBaixa.length === 0 ? (
            <div className="text-gray-500 text-center py-6 border-2 border-dashed border-yellow-300 rounded-lg bg-yellow-50">
              Nenhum aluno com frequência abaixo de 75%.
            </div>
          ) : (
            <div className="space-y-2">
              {alunosComFrequenciaBaixa.map((aluno) => (
                <div key={aluno.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-amber-800">{aluno.nome}</span>
                    <span className="text-amber-600 font-bold">
                      Frequência: {aluno.frequencia}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Resultados
