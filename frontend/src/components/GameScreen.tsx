import TrafficLight from './TrafficLight'
import CarRow from './CarRow'

export default function GameScreen() {
    return (
        <div className="p-4 bg-white rounded shadow-md max-w-2xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">The race is about to start!</h2>
                <TrafficLight />
            </div>

            <div className="space-y-2">
                <CarRow name="Guest (you)" isYou carColor="bg-blue-400" />
                <CarRow name="Guest" carColor="bg-red-400" />
                <CarRow name="Guest" carColor="bg-orange-400" />
                <CarRow name="Guest" carColor="bg-green-400" />
                <CarRow name="Guest" carColor="bg-gray-400" />
            </div>
        </div>
    )
}
