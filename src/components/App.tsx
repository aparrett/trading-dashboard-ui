import '../styles/App.scss'
import Navbar from './Navbar'
import { FC } from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'
import { API_URL } from '../config'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Trades from '../pages/Trades/Trades'
import Overview from '../pages/Overview/Overview'
import { Container } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

const client = new ApolloClient({
    uri: API_URL,
    cache,
    credentials: 'include'
})

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <Container>
                <SnackbarProvider
                    className="snackbar"
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    classes={{
                        variantSuccess: 'snackbar-success',
                        variantError: 'snackbar-error'
                    }}
                >
                    <div className="App">
                        <Router>
                            <Navbar />
                            <Switch>
                                <Route exact path="/">
                                    <Overview />
                                </Route>
                                <Route exact path="/trades">
                                    <Trades />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </SnackbarProvider>
            </Container>
        </ApolloProvider>
    )
}

export default App
