import { useState, useEffect } from 'react'
import TrafficLight from './TrafficLight'
import CarRow from './CarRow'
import TypingArea from './TypingArea'

export default function GameScreen() {
    const textToType = `It is not hard to make money in the market. What is hard to avoid is the alluring temptation to throw your money away on short, get-rich-quick speculative binges. It is an obvious lesson, but one frequently ignored.`
    const totalChars = textToType.length

    const [typedChars, setTypedChars] = useState(0)
    const [canType, setCanType] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState(0)

    useEffect(() => {
        if (canType && startTime === null) {
            setStartTime(Date.now())
        }
    }, [canType, startTime])

    useEffect(() => {
        if (startTime === null || typedChars === 0) return

        const now = Date.now()
        const minutes = (now - startTime) / 1000 / 60
        const words = typedChars / 5
        const newWpm = Math.floor(words / minutes)

        setWpm(newWpm)
    }, [typedChars, startTime])

    return (
        <div className="p-4 bg-white rounded shadow-md max-w-2xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">The race is about to start!</h2>
                <TrafficLight onGo={() => setCanType(true)} />
            </div>

            <div className="space-y-2">
                <CarRow
                    name="Guest (you)"
                    isYou
                    carColor="bg-blue-400"
                    totalChars={totalChars}
                    typedChars={typedChars}
                    wpm={wpm}
                />
                <CarRow name="Guest" carColor="bg-pink-300" totalChars={totalChars} typedChars={0} wpm={0} />
                <CarRow name="Guest" carColor="bg-yellow-400" totalChars={totalChars} typedChars={0} wpm={0} />
                <CarRow name="genroeeee (benz102001)" carColor="bg-red-600" totalChars={totalChars} typedChars={0} wpm={0} />
                <CarRow name="Guest" carColor="bg-blue-300" totalChars={totalChars} typedChars={0} wpm={0} />
            </div>

            <TypingArea
                canType={canType}
                text={textToType}
                onTyping={(typedCount) => setTypedChars(typedCount)}
            />
        </div>
    )
}
