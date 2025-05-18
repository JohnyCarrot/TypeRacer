import { useEffect, useRef, useState } from 'react'

type TypingAreaProps = {
    canType: boolean
    text: string
    onTyping: (correctCharCount: number) => void
    onFinish: (mistakes: string[]) => void
}

const removePunctuation = (word: string) => {
    return word.replace(/[.,!?;:()'"]/g, '') 
}

export default function TypingArea({ canType, text, onTyping, onFinish }: TypingAreaProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [completedWordIndexes, setCompletedWordIndexes] = useState<number[]>([])
    const [mistakeWords, setMistakeWords] = useState<string[]>([]) 
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
        setInput(value)

        let correctCount = 0
        let wordHasMistake = false

        for (let i = 0; i < value.length; i++) {
            if (value[i] === currentWord[i]) {
                correctCount++
            } else if (currentWord[i] !== undefined) {
                wordHasMistake = true
            }
        }

        if (wordHasMistake && !mistakeWords.includes(removePunctuation(currentWord))) {
            setMistakeWords(prev => [...prev, removePunctuation(currentWord)])
        }

        onTyping(currentIndex + correctCount)

        if (value.endsWith(' ')) {
            if (value.trim() === currentWord) {
                const typedLength = currentWord.length + 1
                const newIndex = currentIndex + typedLength
                setCurrentIndex(newIndex)
                setInput('')
                setCompletedWordIndexes([...completedWordIndexes, currentWordIndex])

                if (currentWordIndex === allWords.length - 1) {
                    onFinish(mistakeWords)
                }

                onTyping(newIndex)
            }
        }

        if (currentWordIndex === allWords.length - 1 && value === currentWord) {
            onFinish(mistakeWords) 
        }
    }

    const renderedText = allWords.map((word, index) => {
        const isCompleted = completedWordIndexes.includes(index)
        const isCurrentWord = index === currentWordIndex

        const wordWithStyles = word.split('').map((char, i) => {
            let correctClass = ''
            if (isCurrentWord && i < input.length) {
                if (input[i] === char) {
                    correctClass = 'text-green-600' 
                } else {
                    correctClass = 'text-red-600'  
                }
            }
            
            const showCursor = isCurrentWord && i === input.length
            const cursorClass = showCursor ? 'relative after:content-[""] after:absolute after:left-0 after:h-6 after:w-0.5 after:bg-black after:animate-blink' : ''
            
            return (
                <span key={i} className={`${correctClass} ${isCompleted ? 'text-green-600' : ''} ${cursorClass} font-semibold`}>
                    {char}
                </span>
            )
        })

        if (isCurrentWord && wordWithStyles.length === 0) {
            wordWithStyles.push(
                <span key="cursor-start" className="relative after:content-[''] after:absolute after:left-0 after:h-6 after:w-0.5 after:bg-black after:animate-blink">
                    &nbsp;
                </span>
            )
        }

        return (
            <span key={index}>
                {isCompleted ? (
                    <span className="text-green-600 font-semibold">{word}</span>
                ) : (
                    wordWithStyles
                )}
                {index < allWords.length - 1 && ' '}
            </span>
        )
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