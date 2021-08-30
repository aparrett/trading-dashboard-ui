import { FC } from 'react'
import { Trade, TradesDocument, useSaveTradesMutation } from '../generated/graphql'
import { useFormik } from 'formik'
import { DialogActions, DialogContent, Grid, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { formatImportDate } from '../util/formatImportDate'
import { translateSide } from '../util/csvRowToTrade'
import { roundThree } from '../util/roundPenny'

interface ImportTradesJSONProps {
    onClose: () => void
    selectedStartDate: string
}

const ImportTradesJSON: FC<ImportTradesJSONProps> = ({ onClose, selectedStartDate }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [saveTrades] = useSaveTradesMutation()
    const formik = useFormik({
        initialValues: { trades: '' },
        onSubmit: async (values, { setErrors, resetForm }) => {
            const response = await saveTrades({
                refetchQueries: [{ query: TradesDocument }],
                variables: {
                    trades: JSON.parse(values.trades).map((trade: Trade) => {
                        return {
                            ...trade,
                            entry: roundThree(trade.entry),
                            close: trade.close ? roundThree(trade.close) : undefined,
                            side: translateSide(trade.side),
                            openDate: formatImportDate(trade.openDate),
                            closeDate: formatImportDate(trade.closeDate)
                        }
                    })
                }
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

    // Set example open and close to a date included in the current filter so the trade will show up if the user imports the example.
    const exampleOpen = moment(selectedStartDate).set('hour', 9).set('minute', 46).format('MM-DD-YY HH:mm:ss')
    const exampleClose = moment(selectedStartDate).set('hour', 9).set('minute', 51).format('MM-DD-YY HH:mm:ss')
    const example = JSON.stringify(
        [
            {
                symbol: 'IGC',
                side: 'Long',
                quantity: 250,
                entry: 3.37,
                close: 3.45,
                openDate: exampleOpen,
                closeDate: exampleClose
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
