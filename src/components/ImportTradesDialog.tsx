import { Dialog, Grid } from '@material-ui/core'
import { FC, useState } from 'react'
import ImportTradesJSON from './ImportTradesJSON'
import ImportTradesCSV from './ImportTradesCSV'

interface ImportTradesDialogProps {
    open: boolean
    onClose: () => void
}

const ImportTradesDialog: FC<ImportTradesDialogProps> = ({ open, onClose }) => {
    const [isJSONActive, setIsJSONActive] = useState(true)
    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" className="import-trades-dialog">
            <Grid container className="trade-import-header">
                <Grid item xs={6} className={isJSONActive ? 'active' : ''} onClick={() => setIsJSONActive(true)}>
                    JSON
                </Grid>
                <Grid item xs={6} className={!isJSONActive ? 'active' : ''} onClick={() => setIsJSONActive(false)}>
                    CSV
                </Grid>
            </Grid>
            {isJSONActive ? <ImportTradesJSON onClose={onClose} /> : <ImportTradesCSV onClose={onClose} />}
        </Dialog>
    )
}

export default ImportTradesDialog
