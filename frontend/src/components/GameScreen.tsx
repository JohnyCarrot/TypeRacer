import { useEffect, useState, useRef } from 'react'
import TrafficLight from './TrafficLight'
import CarRow from './CarRow'
import TypingArea from './TypingArea'

type Bot = {
    id: number
    name: string
    base_wpm: number
}

type BotState = {
    id: number
    name: string
    color: string
    base_wpm: number
    typed_text: string
    started_at: number | null
    wpm: number
}

export default function GameScreen() {
    const [textToType, setTextToType] = useState('')
    const [typedChars, setTypedChars] = useState(0)
    const [canType, setCanType] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState(0)
    const [bots, setBots] = useState<BotState[]>([])
    const botColors = ['bg-pink-300', 'bg-yellow-400', 'bg-red-600', 'bg-blue-300', 'bg-green-400']

    const stopSignals = useRef<{ [id: number]: boolean }>({})

    useEffect(() => {
        fetch('http://localhost:8000/texts/random/')
            .then((res) => res.json())
            .then((data) => setTextToType(data.content))
            .catch(() => setTextToType('Error loading text.'))

        loadBots()
    }, [])

    const loadBots = async () => {
        const loadedBots: BotState[] = []

        while (loadedBots.length < 3) {
            const res = await fetch('http://localhost:8000/bots/random/')
            const data: Bot = await res.json()

            if (!loadedBots.find((b) => b.id === data.id)) {
                loadedBots.push({
                    id: data.id,
                    name: data.name,
                    base_wpm: data.base_wpm,
                    typed_text: '',
                    started_at: null,
                    wpm: 0,
                    color: botColors[loadedBots.length % botColors.length],
                })
            }
        }

        setBots(loadedBots)
    }

    useEffect(() => {
        if (canType && startTime === null) {
            setStartTime(Date.now())
        }

        if (canType) {
            bots.forEach((bot) => {
                stopSignals.current[bot.id] = false
                simulateBotTyping(bot)
            })
        }

        return () => {
            // pri reštarte alebo unmount vyčisti boti
            Object.keys(stopSignals.current).forEach((id) => (stopSignals.current[+id] = true))
        }
    }, [canType])

    const simulateBotTyping = async (bot: BotState) => {
        const words = textToType.split(' ')
        let currentText = ''
        const start = Date.now()

        for (const word of words) {
            if (stopSignals.current[bot.id]) break
            const wpm = bot.base_wpm + (Math.random() - 0.5) * 10 // +- 5 wpm
            const timeForWord = (60 / wpm) * 1000

            await new Promise((res) => setTimeout(res, timeForWord))

            currentText += (currentText ? ' ' : '') + word

            const now = Date.now()
            const elapsedMinutes = (now - start) / 1000 / 60
            const charsTyped = currentText.length
            const calculatedWPM = charsTyped / 5 / elapsedMinutes

            setBots((prev) =>
                prev.map((b) =>
                    b.id === bot.id
                        ? {
                            ...b,
                            typed_text: currentText,
                            started_at: start,
                            wpm: Math.floor(calculatedWPM),
                        }
                        : b
                )
            )
        }
    }

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
                    wpm={canType ? wpm : undefined}
                />
                {bots.map((bot) => (
                    <CarRow
                        key={bot.id}
                        name={bot.name}
                        carColor={bot.color}
                        totalChars={totalChars}
                        typedChars={bot.typed_text.length}
                        wpm={canType ? bot.wpm : undefined}
                    />
                ))}
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
