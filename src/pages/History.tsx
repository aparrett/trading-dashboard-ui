import { FC, useState } from 'react'
import ImportTradesDialog from '../components/ImportTradesDialog'
import { useMeQuery, useTradesQuery } from '../generated/graphql'
import { DataGrid, GridValueGetterParams } from '@material-ui/data-grid'
import { ISOtoStandard } from '../util/ISOtoStandard'
import moment from 'moment'
import { Box, Grid, TextField } from '@material-ui/core'
import { getProfitLoss } from '../util/getProfitLoss'
import { getProfitClass } from '../util/getProfitClass'
import { roundPenny } from '../util/roundPenny'

const History: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)

    // Must use this format for date input field to work.
    const today = moment().format('yyyy-MM-DD').toString()
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)

    const { data: meData } = useMeQuery()
    const { data: tradesData } = useTradesQuery()
    const trades = (tradesData?.trades || [])
        .filter((trade) => {
            return (
                !moment(trade.openDate).isBefore(moment(startDate).startOf('day')) &&
                !moment(trade.closeDate).isAfter(moment(endDate).endOf('day'))
            )
        })
        .map((trade) => {
            const { entry, close, quantity, side } = trade
            return {
                ...trade,
                profitLoss: getProfitLoss(entry, close, quantity, side)
            }
        })

    const profit = trades.reduce((acc, trade) => acc + trade.profitLoss, 0)
    const winners = trades.filter((trade) => trade.profitLoss >= 0)
    const losers = trades.filter((trade) => trade.profitLoss < 0)
    const averageWinner =
        winners.length === 0 ? 0 : winners.reduce((acc, trade) => acc + trade.profitLoss, 0) / winners.length
    const averageLoser =
        losers.length === 0 ? 0 : losers.reduce((acc, trade) => acc + trade.profitLoss, 0) / losers.length

    const columns = [
        { field: 'symbol', headerName: 'Symbol' },
        { field: 'side', headerName: 'Side' },
        { field: 'quantity', headerName: 'Qty' },
        { field: 'entry', headerName: 'Entry' },
        { field: 'close', headerName: 'Close' },
        { field: 'profitLoss', headerName: 'Profit' },
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
                    <Grid container>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Trades:</div>
                                        <div>{trades.length}</div>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Winning Trades:</div>
                                        <div>{winners.length}</div>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Losing Trades:</div>
                                        <div>{losers.length}</div>
                                    </Box>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={4}>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Profit:</div>
                                        <div className={getProfitClass(profit)}>{roundPenny(profit)}</div>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Average Winner:</div>
                                        <div className={getProfitClass(averageWinner)}>{roundPenny(averageWinner)}</div>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Average Loser:</div>
                                        <div className={getProfitClass(averageLoser)}>{roundPenny(averageLoser)}</div>
                                    </Box>
                                </Grid>
                                <Grid item xs={2} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="trades-table-wrapper">
                        <DataGrid
                            columns={columns}
                            rows={trades}
                            checkboxSelection
                            density="compact"
                            disableColumnMenu
                            getCellClassName={(params) => {
                                if (params.field !== 'profitLoss') {
                                    return ''
                                }
                                return getProfitClass(Number(params.value))
                            }}
                        />
                    </div>
                    <ImportTradesDialog
                        open={showImportDialog}
                        onClose={() => setShowImportDialog(false)}
                        selectedStartDate={startDate}
                    />
                </div>
            ) : (
                <div>Login to import and analyze your trades.</div>
            )}
        </div>
    )
}

export default History
