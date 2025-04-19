import { useEffect, useRef, useState } from 'react'

type TypingAreaProps = {
    canType: boolean
    text: string
    onTyping: (correctCharCount: number) => void
}

export default function TypingArea({ canType, text, onTyping }: TypingAreaProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [completedWordIndexes, setCompletedWordIndexes] = useState<number[]>([])

    const allWords = text.split(' ')

    useEffect(() => {
        if (canType && inputRef.current) {
            inputRef.current.focus()
        }
    }, [canType])

    const currentWordIndex = completedWordIndexes.length
    const currentWord = allWords[currentWordIndex] || ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value.endsWith(' ')) {
            if (value.trim() === currentWord) {
                const typedLength = currentWord.length + 1
                const newIndex = currentIndex + typedLength
                setCurrentIndex(newIndex)
                setInput('')
                setCompletedWordIndexes([...completedWordIndexes, currentWordIndex])
                onTyping(newIndex)
            }
        } else {
            setInput(value)

            let correctCount = 0
            for (let i = 0; i < value.length; i++) {
                if (value[i] === currentWord[i]) {
                    correctCount++
                } else {
                    break
                }
            }
            onTyping(currentIndex + correctCount)
        }
    }

    const renderedText = allWords.map((word, index) => {
        const isCompleted = completedWordIndexes.includes(index)

        const showWord = (
            <span
                key={index}
                className={isCompleted ? 'text-green-600 font-semibold' : ''}
            >
        {word}
      </span>
        )

        return index < allWords.length - 1 ? [showWord, ' '] : showWord
    })

    return (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6 shadow-inner">
            <div className="mb-4 text-lg leading-relaxed font-serif break-words">
                {renderedText}
            </div>

            <input
                type="text"
                ref={inputRef}
                className="w-full p-2 border border-black rounded text-lg bg-white disabled:bg-gray-200"
                value={input}
                onChange={handleChange}
                placeholder={canType ? 'Start typing here...' : 'Wait for the green light...'}
                disabled={!canType}
            />
        </div>
    )
}
