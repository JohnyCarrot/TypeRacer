type PlayerResult = {
    name: string
    wpm: number
    isYou?: boolean
    position?: number
    finishedAt?: number | null
    mistakes?: string[]
}

type EndScreenProps = {
    results: PlayerResult[]
}

function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function EndScreen({ results }: EndScreenProps) {
    const yourResult = results.find(r => r.isYou)
    const hasMistakes = yourResult?.mistakes && yourResult.mistakes.length > 0
    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">🏁 Výsledky pretekov</h2>


            {yourResult && (
                <p className="text-sm text-gray-600 mb-2">
                    ⏱️ Tvoj čas:{" "}
                    {yourResult.finishedAt
                        ? formatDuration(yourResult.finishedAt - (results.find(r => r.isYou)?.startedAt || 0))
                        : "2:00"}
                </p>
            )}


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

            {hasMistakes && yourResult?.mistakes && (
                <div className="mt-6 text-left pb-6">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Tvoje chyby:</h3>
                    <div className="border rounded-lg overflow-hidden shadow-md">
                        <table className="w-full table-auto">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Slovo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yourResult.mistakes.map((word, index) => (
                                    <tr key={word} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-t`}>
                                        <td className="p-3 text-sm text-gray-700">{word}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

                
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
