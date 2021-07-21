import { Box } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import { useAuthDispatch, useAuthState } from '../context/AuthContext'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import LoginDialog from './LoginDialog'
import RegisterDialog from './RegisterDialog'

const Navbar: FC = () => {
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showRegisterDialog, setShowRegisterDialog] = useState(false)
    const [logout] = useLogoutMutation()
    const auth = useAuthState()
    const dispatch = useAuthDispatch()

    const [skip, setSkip] = useState(false)
    const { data: meData } = useMeQuery({ skip })
    useEffect(() => {
        if (meData) {
            // Once we get our response from the query, don't make any more requests.
            setSkip(true)
            if (meData.me) {
                // If the user exists in the response, set it. Otherwise, the user will need to log in.
                dispatch({ type: 'auth', payload: meData.me })
            }
        }
    }, [meData, dispatch])

    const handleLogout = async () => {
        const res = await logout()
        if (res?.data?.logout) {
            dispatch({ type: 'logout' })
        } else {
            // TODO: use toast alert.
            alert('Something went wrong.')
        }
    }

    return (
        <div>
            <Box display="flex" justifyContent="space-between" className="navbar">
                <div className="logo">TRADE</div>
                <Box display="flex" justifyContent="flex-end">
                    {auth.me ? (
                        <>
                            <div>{auth.me.username}</div>
                            <div className="button link" onClick={handleLogout}>
                                LOGOUT
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="button link"  onClick={() => setShowLoginDialog(true)}>LOGIN</div>
                            <div className="button link" onClick={() => setShowRegisterDialog(true)}>
                                REGISTER
                            </div>
                        </>
                    )}
                </Box>
            </Box>
            <RegisterDialog open={showRegisterDialog} onClose={() => setShowRegisterDialog(false)} />
            <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
        </div>
    )
}

export default Navbar
