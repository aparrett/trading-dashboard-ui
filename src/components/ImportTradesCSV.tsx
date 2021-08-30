import { ChangeEvent, createRef, FC, useState } from 'react'
import { TradeInput, TradesDocument, useSaveTradesMutation } from '../generated/graphql'
import { useFormik } from 'formik'
import { DialogActions, DialogContent } from '@material-ui/core'
import csv from 'csvtojson'
import { csvRowToTrade } from '../util/csvRowToTrade'
import { useSnackbar } from 'notistack'

interface ImportTradesCSVProps {
    onClose: () => void
}

const ImportTradesCSV: FC<ImportTradesCSVProps> = ({ onClose }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [saveTrades] = useSaveTradesMutation()
    const [trades, setTrades] = useState<TradeInput[]>([])
    const [fileName, setFileName] = useState<string | null>(null)
    const inputFile = createRef<HTMLInputElement>()

    const handleSelectFileClick = () => {
        inputFile.current?.click()
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.result) {
                csv()
                    .fromString(reader.result.toString())
                    .then((rows) => setTrades(rows.map((row) => csvRowToTrade(row))))
            }
        }
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0]
            reader.readAsText(file)
            setFileName(file.name)
        }
    }

    const formik = useFormik({
        initialValues: { trades: '' },
        onSubmit: async (_, { setErrors, resetForm }) => {
            const response = await saveTrades({
                refetchQueries: [{ query: TradesDocument }],
                variables: { trades }
            })

            const tradesRes = response?.data?.saveTrades
            if (tradesRes) {
                resetForm()
                onClose()
                enqueueSnackbar('Import success!', { variant: 'success' })
            } else {
                setErrors({ trades: 'Something went wrong' })
            }
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <div style={{ margin: '0 25px', maxWidth: '810px' }}>
                    <input type="file" ref={inputFile} style={{ display: 'none' }} onChange={handleFileChange} />
                    <button type="button" className="button outlined-light" onClick={handleSelectFileClick}>
                        Select File
                    </button>
                    {fileName && <div style={{ marginTop: '15px' }}>{fileName}</div>}
                </div>
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

export default ImportTradesCSV
