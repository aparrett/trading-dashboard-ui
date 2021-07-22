import './App.scss'
import Navbar from './Navbar'
import { FC } from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'
import { API_URL } from '../config'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import History from '../pages/History'
import { Container } from '@material-ui/core'

const client = new ApolloClient({
    uri: API_URL,
    cache,
    credentials: 'include'
})

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <Container>
                <div className="App">
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <div>Overview</div>
                            </Route>
                            <Route exact path="/history">
                                <History />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </Container>
        </ApolloProvider>
    )
}

export default App
