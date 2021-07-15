import './App.scss'
import Navbar from '../components/Navbar'
import { FC } from 'react'

const App: FC = () => {
    return (
        <div className="App">
            <Navbar />
            <p style={{ marginTop: '50px', marginLeft: '50px' }}>
                This is a bunch of sample text to see what it would look like on the page.
            </p>
        </div>
    )
}

export default App
