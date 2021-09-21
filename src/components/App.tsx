import '../styles/App.scss'
import { FC } from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'
import { API_URL } from '../config'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Trades from '../pages/Trades/Trades'
import Overview from '../pages/Overview/Overview'
import { Container } from '@material-ui/core'
import Navbar from './Navbar'
import Login from '../pages/Account/Login'
import Register from '../pages/Account/Register'
import PrivateRoute from './PrivateRoute'

const client = new ApolloClient({
    uri: API_URL,
    cache,
    credentials: 'include'
})

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
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
                <div className="app">
                    <Router>
                        <Navbar />
                        <Container className="main-content">
                            <Switch>
                                <PrivateRoute exact path="/">
                                    <Overview />
                                </PrivateRoute>
                                <PrivateRoute exact path="/trades">
                                    <Trades />
                                </PrivateRoute>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                                <Route exact path="/register">
                                    <Register />
                                </Route>
                            </Switch>
                        </Container>
                    </Router>
                </div>
            </SnackbarProvider>
        </ApolloProvider>
    )
}

export default App
