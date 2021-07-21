import './App.scss'
import Navbar from '../components/Navbar'
import { FC } from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'
import { API_URL } from '../config'

const client = new ApolloClient({
    uri: API_URL,
    cache,
    credentials: 'include'
})

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Navbar />
                <p style={{ marginTop: '50px', marginLeft: '50px' }}>
                    This is a bunch of sample text to see what it would look like on the page.
                </p>
            </div>
        </ApolloProvider>
    )
}

export default App
