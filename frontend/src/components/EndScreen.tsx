import { useNavigate } from 'react-router-dom'

type PlayerResult = {
    name: string
    wpm: number
    isYou?: boolean
    position?: number
    finishedAt?: number | null
}

type EndScreenProps = {
    results: PlayerResult[]
}

export default function EndScreen({ results }: EndScreenProps) {
    const navigate = useNavigate()

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">🏁 Výsledky pretekov</h2>

            <ol className="space-y-2 mb-6">
                {results.map((r) => {
                    const stillRacing = r.finishedAt == null
                    return (
                        <li
                            key={`${r.name}-${r.position ?? 'x'}`}
                            className={`flex justify-between items-center p-2 rounded ${
                                r.isYou ? 'bg-blue-100 font-bold' : 'bg-gray-50'
                            } ${stillRacing ? 'opacity-50 italic' : ''}`}
                        >
              <span>
                {r.position ? `${r.position}. ` : '— '}
                  {r.name} {r.isYou ? '(You)' : ''}
              </span>
                            <span>{stillRacing ? 'Still racing...' : `${r.wpm} WPM`}</span>
                        </li>
                    )
                })}
            </ol>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => (window.location.href = '/')}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
                >
                    🏠 Späť na úvod
                </button>
                <button
                    onClick={() => (window.location.href = '/singleplayer')}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                >
                    🔁 Hrať znova
                </button>
            </div>
        </div>
    )
}
