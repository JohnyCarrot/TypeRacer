import { useState, useEffect } from 'react'
import TrafficLight from './TrafficLight'
import CarRow from './CarRow'
import TypingArea from './TypingArea'

export default function GameScreen() {
    const [textToType, setTextToType] = useState('')
    const [typedChars, setTypedChars] = useState(0)
    const [canType, setCanType] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState(0)

    useEffect(() => {
        // Fetch random text from Django backend
        fetch('http://localhost:8000/texts/random/')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load text')
                return res.json()
            })
            .then((data) => setTextToType(data.content))
            .catch((err) => {
                console.error(err)
                setTextToType('Error loading text. Please try again later.')
            })
    }, [])

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

    const totalChars = textToType.length

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

            {textToType ? (
                <TypingArea
                    canType={canType}
                    text={textToType}
                    onTyping={(typedCount) => setTypedChars(typedCount)}
                />
            ) : (
                <div className="text-gray-500 italic">Loading text...</div>
            )}
        </div>
    )
}
