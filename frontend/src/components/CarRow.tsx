type CarRowProps = {
    name: string
    isYou?: boolean
    carColor?: string
    totalChars: number
    typedChars: number
}

export default function CarRow({
                                   name,
                                   isYou = false,
                                   carColor = 'bg-blue-400',
                                   totalChars,
                                   typedChars,
                               }: CarRowProps) {
    const progress = Math.min(typedChars / totalChars, 1)

    return (
        <div className="flex items-center border-b border-dashed border-yellow-400 py-2 relative">
            {/* Meno */}
            <div
                className="w-[140px] text-sm font-semibold truncate"
                title={name}
            >
                {name} {isYou && <span className="text-xs text-gray-400">(you)</span>}
            </div>

            {/* Dráha */}
            <div className="flex-1 relative h-6 ml-2">
                {/* Cieľová čiara */}
                <div className="absolute top-0 right-0 h-full w-[2px] bg-black z-10" />

                {/* Autíčko */}
                <div
                    className={`absolute top-0 w-10 h-6 rounded-full ${carColor} shadow-md z-20 transition-all duration-200`}
                    style={{ left: `calc(${progress * 100}% - 1.25rem)` }}
                />
            </div>

            {/* WPM */}
            <div className="text-xs text-gray-500 ml-4 w-[50px] text-right">0 wpm</div>
        </div>
    )
}
