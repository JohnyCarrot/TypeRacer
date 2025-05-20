type HeaderProps = {
    buttonText?: string
    buttonDestination?: string
    heading: string
}

export default function Header({ buttonText, buttonDestination, heading } : HeaderProps) {
    return (
            <div className="bottom-4 left-4 right-4 flex justify-between">
                {buttonText && buttonDestination && (<button onClick={() => window.location.href = buttonDestination} className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded">{buttonText}</button>)}
                <h1 className="text-gray-100 text-center font-bold text-3xl">{heading}</h1>
            </div>
    )
}
