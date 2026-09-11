import { Check, X } from 'lucide-react'

export interface CharacterResult {
  char: string
  pinyin: string
  history: ('correct' | 'incorrect')[]
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
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-[#f0f5f3]">
              <th className="border-r border-gray-200 p-3 font-semibold text-gray-600">
                Character
              </th>
              {dates.map((d, index) => (
                <th
                  key={d}
                  className={`p-3 text-center font-semibold text-gray-600 ${
                    index < dates.length - 1 ? 'border-r border-gray-200' : ''
                  }`}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 1 ? 'bg-[#fcfbf9]' : 'bg-white'}
              >
                <td className="border-r border-gray-200 p-3">
                  <div className="text-base font-bold text-gray-900">
                    {row.char}
                  </div>
                  <div className="text-[10px] text-gray-400">{row.pinyin}</div>
                </td>
                {row.history.map((status, i) => (
                  <td
                    key={i}
                    className={`p-3 text-center vertical-middle ${
                      i < row.history.length - 1 ? 'border-r border-gray-200' : ''
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}