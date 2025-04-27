export default function WelcomePage() {
    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">TypeRacer</h2>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => (window.location.href = '/singleplayer')}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
                >
                    🏎 Zapnúť preteky
                </button>
            </div>
        </div>
    )
}
