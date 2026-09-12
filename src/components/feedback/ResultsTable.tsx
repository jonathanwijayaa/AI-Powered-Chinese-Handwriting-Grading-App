import { Check, X } from 'lucide-react'

export interface CharacterResult {
  char: string
  pinyin: string
  historyData: ('correct' | 'incorrect')[]
}

interface ResultsTableProps {
  dates: string[]
  data: CharacterResult[]
}

export function ResultsTable({ dates, data }: ResultsTableProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-gray-900">Results over time</h3>

      <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-[#f0f5f3]">
                <th className="sticky left-0 z-10 w-24 border-r border-gray-200 bg-[#f0f5f3] p-3 font-semibold text-gray-600">
                  Character
                </th>
                {dates.map((d, index) => (
                  <th
                    key={`${d}-${index}`}
                    className={`p-3 text-center font-semibold text-gray-600 min-w-[75px] ${
                      index < dates.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, idx) => {
                const isOdd = idx % 2 === 1
                const bgClass = isOdd ? 'bg-[#fcfbf9]' : 'bg-white'

                return (
                  <tr key={idx} className={bgClass}>
                    <td className={`sticky left-0 z-10 border-r border-gray-200 p-3 ${bgClass}`}>
                      <div className="text-base font-bold text-gray-900">{row.char}</div>
                      <div className="text-[10px] text-gray-400">{row.pinyin}</div>
                    </td>

                    {/* Mengakses row.historyData */}
                    {(row.historyData || []).map((status, i) => (
                      <td
                        key={i}
                        className={`p-3 text-center align-middle ${
                          i < (row.historyData?.length || 0) - 1 ? 'border-r border-gray-200' : ''
                        }`}
                      >
                        {status === 'correct' ? (
                          <Check
                            className="inline size-4 text-emerald-600"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X
                            className="inline size-4 text-rose-500"
                            strokeWidth={2.5}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}