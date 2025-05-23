import { useEffect, useState, useRef } from 'react'
import TrafficLight from './TrafficLight'
import CarRow from './CarRow'
import TypingArea from './TypingArea'
import EndScreen from './EndScreen'

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
    finishedAt: number | null
}

export default function GameScreen() {
    const [textToType, setTextToType] = useState('')
    const [typedChars, setTypedChars] = useState(0)
    const [canType, setCanType] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [playerFinishedAt, setPlayerFinishedAt] = useState<number | null>(null)
    const [wpm, setWpm] = useState(0)
    const [bots, setBots] = useState<BotState[]>([])
    const [showEndScreen, setShowEndScreen] = useState(false)
    const [playerMistakes, setPlayerMistakes] = useState<string[]>([])
    const botColors = ['bg-pink-300', 'bg-yellow-400', 'bg-red-600', 'bg-blue-300', 'bg-green-400']
    const stopSignals = useRef<{ [id: number]: boolean }>({})

    const [remainingTime, setRemainingTime] = useState(120) 

    useEffect(() => {
        if (!canType || startTime === null) return
    
        const timerInterval = setInterval(() => {
            const now = Date.now()
            const elapsed = Math.floor((now - startTime) / 1000)
            const timeLeft = 120 - elapsed
    
            setRemainingTime(timeLeft)
    
            
            if (playerFinishedAt !== null) {
                clearInterval(timerInterval)
                return
            }
    
            if (timeLeft <= 0) {
                clearInterval(timerInterval)
                if (playerFinishedAt === null) {
                    setPlayerFinishedAt(startTime + 120000)
                    setTimeout(() => setShowEndScreen(true), 1000)
                }
            }
        }, 1000)
    
        return () => clearInterval(timerInterval)
    }, [canType, startTime, playerFinishedAt])

    const totalChars = textToType.length

    useEffect(() => {
        fetch('http://localhost:8000/texts/random/')
            .then((res) => res.json())
            .then((data) => setTextToType(data.content))
            .catch(() => setTextToType('Error loading text.'))

        loadBots()
    }, [])

    const loadBots = async () => {
        const loadedBots: BotState[] = []

        try {
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
                        finishedAt: null,
                        color: botColors[loadedBots.length % botColors.length],
                    })
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.warn('⚠️ Nepodarilo sa načítať botov z backendu. Používam defaultných.')
            const fallbackBots = [
                { id: 1001, name: 'Fallback Bot 1', base_wpm: 20 },
                { id: 1002, name: 'Fallback Bot 2', base_wpm: 25 },
                { id: 1003, name: 'Fallback Bot 3', base_wpm: 30 },
            ]

            fallbackBots.forEach((bot, index) => {
                loadedBots.push({
                    ...bot,
                    typed_text: '',
                    started_at: null,
                    wpm: 0,
                    finishedAt: null,
                    color: botColors[index % botColors.length],
                })
            })
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
            Object.keys(stopSignals.current).forEach((id) => (stopSignals.current[+id] = true))
        }
    }, [canType])

    const simulateBotTyping = async (bot: BotState) => {
        const words = textToType.split(' ')
        let currentText = ''
        const start = Date.now()

        for (const word of words) {
            if (stopSignals.current[bot.id]) break

            const wpm = bot.base_wpm + (Math.random() - 0.5) * 10
            const timeForWord = (60 / wpm) * 1000

            await new Promise((res) => setTimeout(res, timeForWord))

            currentText += (currentText ? ' ' : '') + word

            const now = Date.now()
            const elapsedMinutes = (now - start) / 1000 / 60
            const charsTyped = currentText.length
            const calculatedWPM = charsTyped / 5 / elapsedMinutes
            const isFinished = charsTyped >= textToType.length

            setBots((prev) =>
                prev.map((b) =>
                    b.id === bot.id
                        ? {
                            ...b,
                            typed_text: currentText,
                            started_at: start,
                            wpm: Math.floor(calculatedWPM),
                            finishedAt: isFinished && !b.finishedAt ? now : b.finishedAt,
                        }
                        : b
                )
            )
        }
    }

    useEffect(() => {
        if (startTime === null || playerFinishedAt !== null) return

        const now = Date.now()
        const minutes = (now - startTime) / 1000 / 60
        const words = typedChars / 5
        const newWpm = Math.floor(words / minutes)

        setWpm(newWpm)

        if (typedChars >= totalChars) {
            setPlayerFinishedAt(now)
            setTimeout(() => setShowEndScreen(true), 1000)
        }
    }, [typedChars, startTime])

    const getFinalResults = () => {
        const allPlayers = [
            {
                name: 'You',
                wpm: wpm,
                finishedAt: playerFinishedAt,
                isYou: true,
                mistakes: playerMistakes,
                startedAt: startTime
            },
            ...bots.map((b) => ({
                name: b.name,
                wpm: b.wpm,
                finishedAt: b.finishedAt,
                isYou: false,
            })),
        ]

        const sorted = [...allPlayers].sort((a, b) => {
            if (a.finishedAt && b.finishedAt) return a.finishedAt - b.finishedAt
            if (a.finishedAt) return -1
            if (b.finishedAt) return 1
            return 0
        })

        let position = 1
        const withPositions = sorted.map((p) => ({
            ...p,
            position: p.finishedAt ? position++ : undefined,
        }))

        return withPositions
    }

    if (showEndScreen) {
        return <EndScreen results={getFinalResults()} />
    }

    return (
        <div className="p-4 bg-white rounded shadow-md max-w-2xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">The race is about to start!</h2>
                <TrafficLight onGo={() => setCanType(true)} />
            </div>

            {canType && (
                <div className="text-right text-sm text-gray-600">
                    ⏱️ Time left: {Math.floor(remainingTime / 60)}:
                    {(remainingTime % 60).toString().padStart(2, '0')}
                </div>
            )}

            <div className="space-y-2">
                <CarRow
                    name="Guest"
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
                    onFinish={(mistakes) => {
                        setPlayerMistakes(mistakes)
                    }}
                />
            ) : (
                <div className="text-gray-500 italic">Loading text...</div>
            )}
        </div>
    )
}
