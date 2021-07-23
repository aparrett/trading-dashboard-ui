import { FC } from 'react'
import { useSaveTradesMutation } from '../generated/graphql'
import { useFormik } from 'formik'
import { DialogActions, DialogContent, Grid, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'

interface ImportTradesJSONProps {
    onClose: () => void
}

const ImportTradesJSON: FC<ImportTradesJSONProps> = ({ onClose }) => {
    const { enqueueSnackbar } = useSnackbar()
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
                enqueueSnackbar('Import success!', { variant: 'success' })
            } else {
                setErrors({ trades: 'Something went wrong' })
            }
        }
    })

    const example = JSON.stringify(
        [
            {
                symbol: 'IGC',
                side: 'Long',
                quantity: 250,
                entry: 3.37,
                close: 3.45,
                openDate: '07-22-21 08:16:55',
                closeDate: '07-22-21 08:21:16'
            }
        ],
        undefined,
        4
    )
    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Grid container className="import-trades-json-container">
                    <Grid item xs={6}>
                        <div>Example</div>
                        <pre>{example}</pre>
                    </Grid>
                    <Grid item xs={6}>
                        Input
                        <TextField
                            multiline
                            rows={10}
                            rowsMax={10}
                            autoFocus
                            InputProps={{ disableUnderline: true }}
                            margin="dense"
                            name="trades"
                            fullWidth
                            value={formik.values.trades}
                            onChange={formik.handleChange}
                            error={formik.touched.trades && Boolean(formik.errors.trades)}
                            helperText={formik.touched.trades && formik.errors.trades}
                        />
                    </Grid>
                </Grid>
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
