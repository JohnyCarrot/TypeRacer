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

    useEffect(() => {
        if (canType && inputRef.current) {
            inputRef.current.focus()
        }
    }, [canType])

    // Aktuálne slovo z textu
    const remainingText = text.slice(currentIndex)
    const nextSpace = remainingText.indexOf(' ')
    const currentWord = nextSpace === -1 ? remainingText : remainingText.slice(0, nextSpace)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Ak hráč napísal celé slovo a stlačil medzeru
        if (value.endsWith(' ')) {
            if (value.trim() === currentWord) {
                const typedLength = currentWord.length + 1 // +1 za medzeru
                const newIndex = currentIndex + typedLength
                setCurrentIndex(newIndex)
                setInput('')
                onTyping(newIndex)
            } else {
                // zlá medzera – ignoruj alebo daj spätnú väzbu (zatiaľ nič)
            }
        } else {
            setInput(value)

            // Pre živý posun autíčka aj keď ešte neukončil slovo
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

    return (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6 shadow-inner">
            <div className="mb-4 text-lg leading-relaxed font-serif">
                {text}
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
