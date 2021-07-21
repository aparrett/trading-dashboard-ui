import { createContext, Dispatch, useContext, useReducer, ReactNode } from 'react'

interface User {
    username: string,
    id: number
}
interface AuthState {
    me: User | null
}

const initialState: AuthState = {
    me: null
}

export const AuthStateContext = createContext<AuthState | null>(null)
export const AuthDispatchContext = createContext<Dispatch<any>>(() => {})

export const AuthReducer = (state: AuthState, action: { type: string, payload?: AuthState }) => {
    switch (action.type) {
        case 'auth':
            return { me: action.payload }
        case 'logout':
            return { me: null }
        default:
            return state
    }
}

export const useAuthState = () => {
    let context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }
    if (context === null) {
        context = initialState
    }

    return context
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }

    return context
}

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    // @ts-ignore
    const [user, dispatch] = useReducer(AuthReducer, initialState)

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}
