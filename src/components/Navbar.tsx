import { Box } from '@material-ui/core'
import { FC, useState } from 'react'
import RegisterDialog from './RegisterDialog'

const Navbar: FC = () => {
    // const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showRegisterDialog, setShowRegisterDialog] = useState(false)

    return (
        <div>
            <Box display="flex" justifyContent="space-between" className="navbar">
                <div className="logo">TRADE</div>
                <Box display="flex" justifyContent="flex-end">
                    <div className="button link">LOGIN</div>
                    <div className="button link" onClick={() => setShowRegisterDialog(true)}>REGISTER</div>
                </Box>
            </Box>
            {/* <RegisterDialog   /> */}
            <RegisterDialog open={showRegisterDialog} onClose={() => setShowRegisterDialog(false)} />
        </div>
    )
}

export default Navbar
