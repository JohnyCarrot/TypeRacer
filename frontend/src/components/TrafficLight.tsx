import { useEffect, useState } from 'react'

export default function TrafficLight() {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        if (timeLeft < -1) return
        const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft])

    const getActiveLight = (): number | null => {
        if (timeLeft > 2) return 0     // červená
        if (timeLeft > 0) return 1     // oranžová
        if (timeLeft === 0) return 2   // zelená
        return 2                       // stále zelená po štarte
    }

    const activeLight = getActiveLight()

    const getText = () => {
        if (timeLeft > 2) return 'Príprava na štart...'
        if (timeLeft > 0) return 'Get ready!'
        if (timeLeft === 0) return '🚀 GO!'
        return '' // po štarte nič
    }

    return (
        <div className="flex items-center gap-4">
            <div className="bg-black p-2 rounded-md border-2 border-gray-800 flex flex-col gap-2 w-12 items-center shadow-inner">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-6 h-6 rounded-full ${
                            activeLight === i
                                ? ['bg-red-500', 'bg-yellow-400', 'bg-green-500'][i]
                                : 'bg-gray-700'
                        } transition-colors duration-300`}
                    />
                ))}
            </div>

            <div className="flex flex-col justify-center text-sm text-gray-800 font-semibold">
                <div>{getText()}</div>
                {timeLeft >= 0 && (
                    <div className="text-right text-gray-500">:{timeLeft.toString().padStart(2, '0')}</div>
                )}
            </div>
        </div>
    )
}
