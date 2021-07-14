import { Box } from '@material-ui/core'

function Navbar() {
    return (
        <Box display="flex" justifyContent="space-between" className="navbar">
            <div className="logo">TRADE</div>
            <Box display="flex" justifyContent="flex-end">
                <div className="button link">LOGIN</div>
                <div className="button link">REGISTER</div>
            </Box>
        </Box>
    )
}

export default Navbar
