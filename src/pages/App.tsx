import './App.scss'
import Navbar from '../components/Navbar'
import { FC } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AuthProvider } from '../context/AuthContext'

const client = new ApolloClient({
    uri: process.env.TD_API || 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include'
})

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <p style={{ marginTop: '50px', marginLeft: '50px' }}>
                        This is a bunch of sample text to see what it would look like on the page.
                    </p>
                </div>
            </AuthProvider>
        </ApolloProvider>
    )
}

export default App
