type PlayerResult = {
    name: string
    wpm: number
    isYou?: boolean
    position: number
}

type EndScreenProps = {
    results: PlayerResult[]
}

export default function EndScreen({ results }: EndScreenProps) {
    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">🏁 Race Results</h2>
            <ol className="space-y-2">
                {results.map((r) => (
                    <li
                        key={r.name}
                        className={`flex justify-between p-2 rounded ${
                            r.isYou ? 'bg-blue-100 font-bold' : 'bg-gray-50'
                        }`}
                    >
            <span>
              {r.position}. {r.name} {r.isYou ? '(You)' : ''}
            </span>
                        <span>{r.wpm} WPM</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}
