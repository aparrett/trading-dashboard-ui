import { Box } from '@material-ui/core'
import { FC, useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import LoginDialog from './LoginDialog'
import RegisterDialog from './RegisterDialog'
import { cache } from '../cache'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showRegisterDialog, setShowRegisterDialog] = useState(false)
    const [logout] = useLogoutMutation()
    const { data: meData } = useMeQuery()

    const handleLogout = async () => {
        const res = await logout()
        if (res?.data?.logout) {
            cache.evict({ fieldName: 'me' })
        } else {
            // TODO: use toast alert.
            alert('Something went wrong.')
        }
    }

    return (
        <div>
            <Box display="flex" justifyContent="space-between" className="navbar">
                <div style={{ display: 'flex' }}>
                    <div className="logo">
                        <Link to="/">TRADE</Link>
                    </div>
                    <button className="button outlined-light">
                        <Link to="/">Overview</Link>
                    </button>
                    <button className="button outlined-light">
                        <Link to="/history">History</Link>
                    </button>
                </div>
                <Box display="flex" justifyContent="flex-end">
                    {meData?.me ? (
                        <>
                            <div className="username">{meData.me.username}</div>
                            <div className="button link" onClick={handleLogout}>
                                LOGOUT
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="button link" onClick={() => setShowLoginDialog(true)}>
                                LOGIN
                            </div>
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
