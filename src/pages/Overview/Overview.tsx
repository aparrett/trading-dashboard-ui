import { FC } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Overview.scss'
import { plColors } from '../../constants'
import { Trade, useTradesQuery } from '../../generated/graphql'
import { getProfitLoss } from '../../util/getProfitLoss'
import { condenseTrades } from '../../util/condenseTrades'
import moment from 'moment'
import { getProfitClass } from '../../util/getProfitClass'
import { roundTwo } from '../../util/roundPenny'

const Overview: FC = () => {
    const { data: tradesData } = useTradesQuery()
    const trades = tradesData?.trades || []

    // Create a map of dates to profit losses.
    const dateMap: { [x: string]: number } = {}
    condenseTrades(trades as Trade[]).forEach((trade) => {
        const { entry, close, quantity, side } = trade
        if (!close) {
            return
        }
        const date = moment(trade.closeDate).format('YYYY-MM-DD')
        const profitLoss = getProfitLoss(entry, close, quantity, side)

        if (dateMap[date]) {
            dateMap[date] += profitLoss
        } else {
            dateMap[date] = profitLoss
        }
    })

    // We map our dates and profit losses to the structure FullCalendar requires. We don't need calendar events obviously but this is an easy way to put our profit loss on a pre-made calendar.
    const events = Object.keys(dateMap).map((date) => ({
        title: roundTwo(dateMap[date]).toString(), // profitLoss
        date,
        textColor: plColors[getProfitClass(dateMap[date]) || 'green']
    }))

    return (
        <div>
            <h1>Overview</h1>
            <FullCalendar showNonCurrentDates={false} plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
        </div>
    )
}

export default Overview
