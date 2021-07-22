import { Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@material-ui/core'
import { useFormik } from 'formik'
import { FC } from 'react'
import { useSaveTradesMutation } from '../generated/graphql'

interface ImportTradesDialogProps {
    open: boolean
    onClose: () => void
}

const ImportTradesDialog: FC<ImportTradesDialogProps> = ({ open, onClose }) => {
    const [saveTrades] = useSaveTradesMutation()
    const formik = useFormik({
        initialValues: { trades: '' },
        onSubmit: async (values, { setErrors }) => {
            const response = await saveTrades({
                variables: { trades: JSON.parse(values.trades) }
            })

            const trades = response?.data?.saveTrades
            console.log(trades)
            if (trades) {
                onClose()
            } else {
                setErrors({ trades: 'Something went wrong' })
            }
        }
    })
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>IMPORT TRADES</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        rows={10}
                        rowsMax={10}
                        autoFocus
                        margin="dense"
                        name="trades"
                        label="TRADES JSON"
                        fullWidth
                        value={formik.values.trades}
                        onChange={formik.handleChange}
                        error={formik.touched.trades && Boolean(formik.errors.trades)}
                        helperText={formik.touched.trades && formik.errors.trades}
                    />
                </DialogContent>
                <DialogActions>
                    <button className="button link light" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="button link dark" type="submit">
                        IMPORT
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ImportTradesDialog
