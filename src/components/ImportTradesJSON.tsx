import { FC } from 'react'
import { useSaveTradesMutation } from '../generated/graphql'
import { useFormik } from 'formik'
import { DialogActions, DialogContent, TextField } from '@material-ui/core'

interface ImportTradesJSONProps {
    onClose: () => void
}

const ImportTradesJSON: FC<ImportTradesJSONProps> = ({ onClose }) => {
    const [saveTrades] = useSaveTradesMutation()
    const formik = useFormik({
        initialValues: { trades: '' },
        onSubmit: async (values, { setErrors, resetForm }) => {
            const response = await saveTrades({
                variables: { trades: JSON.parse(values.trades) }
            })

            const trades = response?.data?.saveTrades
            if (trades) {
                resetForm()
                onClose()
            } else {
                setErrors({ trades: 'Something went wrong' })
            }
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    multiline
                    rows={10}
                    rowsMax={10}
                    autoFocus
                    margin="dense"
                    name="trades"
                    label="Trades"
                    fullWidth
                    value={formik.values.trades}
                    onChange={formik.handleChange}
                    error={formik.touched.trades && Boolean(formik.errors.trades)}
                    helperText={formik.touched.trades && formik.errors.trades}
                />
            </DialogContent>
            <DialogActions>
                <button className="button link light" type="reset" onClick={onClose}>
                    CANCEL
                </button>
                <button className="button link dark" type="submit">
                    IMPORT
                </button>
            </DialogActions>
        </form>
    )
}

export default ImportTradesJSON
