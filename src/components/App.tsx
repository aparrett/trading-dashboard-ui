import '../styles/App.scss'
import { FC } from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'
import { API_URL } from '../config'
import { SnackbarProvider } from 'notistack'
import Routes from './Routes'

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
                    <Routes />
                </div>
            </SnackbarProvider>
        </ApolloProvider>
    )
}

export default App
