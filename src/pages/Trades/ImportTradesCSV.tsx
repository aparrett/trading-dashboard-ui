import { ChangeEvent, createRef, FC, useState } from 'react'
import { TradeInput, TradesDocument, useSaveTradesMutation } from '../../generated/graphql'
import { useFormik } from 'formik'
import { DialogActions, DialogContent } from '@material-ui/core'
import csv from 'csvtojson'
import { csvRowToTrade } from '../../util/csvRowToTrade'
import { useSnackbar } from 'notistack'

interface ImportTradesCSVProps {
    onClose: () => void
}

const ImportTradesCSV: FC<ImportTradesCSVProps> = ({ onClose }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [saveTrades] = useSaveTradesMutation()
    const [trades, setTrades] = useState<TradeInput[]>([])
    const [fileNames, setFileNames] = useState<string[]>([])
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
                    .then((rows) => setTrades([...trades, ...rows.map((row) => csvRowToTrade(row))]))
            }
        }
        if (event.currentTarget.files) {
            const { length } = event.currentTarget.files
            for (let i = 0; i < length; i++) {
                const file = event.currentTarget.files[i]
                reader.readAsText(file)
                setFileNames([...fileNames, file.name])
            }
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
                    <button type="button" className="button small" onClick={handleSelectFileClick}>
                        Select File
                    </button>
                    {fileNames.map((fileName) => (
                        <div style={{ marginTop: '15px' }}>{fileName}</div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <button className="button link light" type="reset" onClick={onClose}>
                    Cancel
                </button>
                <button className="button link" type="submit">
                    Import
                </button>
            </DialogActions>
        </form>
    )
}

export default ImportTradesCSV
