import { Box, Menu, MenuItem } from '@material-ui/core'
import { FC, useState, MouseEvent } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import LoginDialog from './LoginDialog'
import RegisterDialog from './RegisterDialog'
import { cache } from '../cache'
import { Link } from 'react-router-dom'
import { AccountCircle, Assessment, ViewList } from '@material-ui/icons'

const Navbar: FC = () => {
    const [accountMenuAnchor, setAccountMenuAnchor] = useState<SVGSVGElement | null>(null)
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

    const handleAccountMenuClick = (e: MouseEvent<SVGSVGElement>) => {
        setAccountMenuAnchor(e.currentTarget)
    }

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null)
    }

    return (
        <div>
            <Box className="navbar">
                <div className="nav">
                    <Link to="/">
                        <Assessment />
                    </Link>
                    <Link to="/trades">
                        <ViewList />
                    </Link>
                </div>
                <div className="nav-account">
                    <AccountCircle onClick={handleAccountMenuClick} />
                    <Menu
                        anchorEl={accountMenuAnchor}
                        keepMounted
                        open={Boolean(accountMenuAnchor)}
                        onClose={handleAccountMenuClose}
                    >
                        {meData?.me ? (
                            <MenuItem
                                onClick={() => {
                                    handleLogout()
                                    handleAccountMenuClose()
                                }}
                            >
                                Logout
                            </MenuItem>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        setShowLoginDialog(true)
                                        handleAccountMenuClose()
                                    }}
                                >
                                    Login
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setShowRegisterDialog(true)
                                        handleAccountMenuClose()
                                    }}
                                >
                                    Register
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                </div>
            </Box>
            <RegisterDialog open={showRegisterDialog} onClose={() => setShowRegisterDialog(false)} />
            <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
        </div>
    )
}

export default Navbar
