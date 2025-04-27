import Header from "../components/Header"
import WelcomePage from "../components/WelcomePage"

const Home = () => (
    <div className="pt-10 max-w-xl mx-auto text-center">
        <Header 
            heading="Vitaj na úvodnej stránke"/>
        <WelcomePage />
    </div>
)

export default Home