import { Box, Menu, MenuItem } from '@material-ui/core'
import { FC, useState, MouseEvent } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AccountCircle, Event, ViewList } from '@material-ui/icons'
import { useApolloClient } from '@apollo/client'
import { useSnackbar } from 'notistack'

const Navbar: FC = () => {
    const [accountMenuAnchor, setAccountMenuAnchor] = useState<SVGSVGElement | null>(null)
    const [logout] = useLogoutMutation()
    const { data: meData } = useMeQuery()
    const history = useHistory()
    const client = useApolloClient()
    const location = useLocation()
    const { enqueueSnackbar } = useSnackbar()

    const handleLogout = async () => {
        const res = await logout()
        if (res?.data?.logout) {
            client.clearStore()
            history.push('/login')
        } else {
            enqueueSnackbar('Logout failed.', { variant: 'error' })
        }
    }

    const handleAccountMenuClick = (e: MouseEvent<SVGSVGElement>) => {
        setAccountMenuAnchor(e.currentTarget)
    }

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null)
    }

    const getActiveClass = (path: string) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <div>
            <Box className="navbar">
                <div className="nav">
                    <Link to="/">
                        <Event className={getActiveClass('/')} />
                    </Link>
                    <Link to="/trades">
                        <ViewList className={getActiveClass('/trades')} />
                    </Link>
                </div>
                <div className="nav-account">
                    <AccountCircle onClick={handleAccountMenuClick} />
                    <Menu
                        anchorEl={accountMenuAnchor}
                        keepMounted
                        open={Boolean(accountMenuAnchor)}
                        onClose={handleAccountMenuClose}
                        className="nav-account-menu"
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
                            <div>
                                <MenuItem
                                    onClick={() => {
                                        handleAccountMenuClose()
                                        history.push('/login')
                                    }}
                                >
                                    Login
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleAccountMenuClose()
                                        history.push('/register')
                                    }}
                                >
                                    Register
                                </MenuItem>
                            </div>
                        )}
                    </Menu>
                </div>
            </Box>
        </div>
    )
}

export default Navbar
