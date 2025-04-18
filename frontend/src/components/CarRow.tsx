type CarRowProps = {
    name: string
    isYou?: boolean
    carColor?: string
}

export default function CarRow({ name, isYou = false, carColor = 'bg-blue-400' }: CarRowProps) {
    return (
        <div className="flex items-center justify-between border-b border-dashed border-yellow-400 py-2">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-6 rounded-full ${carColor} shadow-md`} />
                <span className="text-sm font-semibold">
          {name} {isYou ? <span className="text-xs text-gray-400">(you)</span> : ''}
        </span>
            </div>

            <span className="text-xs text-gray-500">0 wpm</span>
        </div>
    )
}
