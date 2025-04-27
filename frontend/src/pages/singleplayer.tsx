import GameScreen from '../components/GameScreen'
import Header from '../components/Header'


const Singleplayer = () => (
    <div className="pt-10 max-w-xl mx-auto text-center">
        <Header 
            buttonText="⤺ Späť na úvod"
            buttonDestination="/"
            heading="Hra pre jedného hráča"/>
        <GameScreen />
    </div>
)

export default Singleplayer