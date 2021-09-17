import { FC, useState } from 'react'
import ImportTradesDialog from './ImportTradesDialog'
import { Trade, useMeQuery, useTradesQuery } from '../../generated/graphql'
import moment from 'moment'
import { Grid, TextField } from '@material-ui/core'
import { condenseTrades } from '../../util/condenseTrades'
import { TradesTable } from './TradesTable'
import { TradesStatistics } from '../../components/TradesStatistics'
import './Trades.scss'

const Trades: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    // Must use this format for date input field to work.
    const today = moment().format('yyyy-MM-DD').toString()
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)

    const { data: meData } = useMeQuery()
    const { data: tradesData } = useTradesQuery()
    const filteredTrades = (tradesData?.trades || []).filter((trade) => {
        // Always use the close date to filter if it exists.
        const filterDate = trade.closeDate || trade.openDate
        return (
            !moment(filterDate).isBefore(moment(startDate).startOf('day')) &&
            !moment(filterDate).isAfter(moment(endDate).endOf('day'))
        )
    })

    const condensedTrades = condenseTrades(filteredTrades as Trade[])

    const handleStartDateChange = (date: string) => {
        // If the start is after the end date, change both to the selected start date.
        if (moment(date).isAfter(moment(endDate).endOf('day'))) {
            setEndDate(date)
        }

        setStartDate(date)
    }

    const handleEndDateChange = (date: string) => {
        // If the end is before the start date, change both to the selected end date.
        if (moment(date).isBefore(moment(startDate).startOf('day'))) {
            setStartDate(date)
        }

        setEndDate(date)
    }

    return (
        <div>
            <h1>Trades</h1>
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
                        <TradesStatistics trades={condensedTrades} />
                    </Grid>
                    <TradesTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} trades={condensedTrades} />
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

export default Trades
