import { FC, useState } from 'react'
import ImportTradesDialog from '../components/ImportTradesDialog'
import { useMeQuery, useTradesQuery } from '../generated/graphql'
import { DataGrid, GridValueGetterParams } from '@material-ui/data-grid'
import { ISOtoStandard } from '../util/ISOtoStandard'
import moment from 'moment'
import { TextField } from '@material-ui/core'

const History: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)

    // Must use this format for textarea input field to work.
    const today = moment().format('yyyy-MM-DD').toString()
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)

    const { data: meData } = useMeQuery()
    const { data: tradesData } = useTradesQuery()
    const trades = (tradesData?.trades || []).filter((trade) => {
        return (
            !moment(trade.openDate).isBefore(moment(startDate).startOf('day')) &&
            !moment(trade.closeDate).isAfter(moment(endDate).endOf('day'))
        )
    })

    const columns = [
        { field: 'symbol', headerName: 'Symbol' },
        { field: 'side', headerName: 'Side' },
        { field: 'quantity', headerName: 'Qty' },
        { field: 'entry', headerName: 'Entry' },
        { field: 'close', headerName: 'Close' },
        {
            field: 'openDate',
            headerName: 'Open Date',
            width: 160,
            valueGetter: (v: GridValueGetterParams) => ISOtoStandard(v.value?.toString())
        },
        {
            field: 'closeDate',
            headerName: 'Close Date',
            width: 160,
            valueGetter: (v: GridValueGetterParams) => ISOtoStandard(v.value?.toString())
        }
    ]

    const handleStartDateChange = (date: string) => {
        if (moment(date).isAfter(moment(endDate).endOf('day'))) {
            setStartDate(endDate)
        } else {
            setStartDate(date)
        }
    }

    const handleEndDateChange = (date: string) => {
        if (moment(date).isBefore(moment(startDate).startOf('day'))) {
            setEndDate(startDate)
        } else {
            setEndDate(date)
        }
    }

    return (
        <div>
            <h1>History</h1>
            {meData?.me ? (
                <div>
                    <TextField
                        label="Start Date"
                        defaultValue={startDate}
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Date"
                        defaultValue={endDate}
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        style={{ marginLeft: '20px' }}
                    />
                    <button
                        className="button light link"
                        style={{ marginLeft: '40px', marginTop: '2px' }}
                        onClick={() => setShowImportDialog(true)}
                    >
                        Import
                    </button>
                    <div className="trades-table-wrapper">
                        <DataGrid
                            disableColumnMenu
                            columns={columns}
                            rows={trades}
                            checkboxSelection
                            density="compact"
                        />
                    </div>
                    <ImportTradesDialog
                        open={showImportDialog}
                        onClose={() => setShowImportDialog(false)}
                        selectedStartDate={startDate}
                    />
                </div>
            ) : (
                <div>Login to start importing and analyzing your trades.</div>
            )}
        </div>
    )
}

export default History
