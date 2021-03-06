import { Trade } from '../generated/graphql'
import moment from 'moment'
import { roundThree } from './roundPenny'
import { getProfitLoss } from './getProfitLoss'
import { TradeWithPL } from '../types'

const getAveragePrice = (trades: Trade[], quantity: number) => {
    return (
        trades.reduce((acc, trade) => {
            const totalCost = trade.quantity * trade.entry
            return acc + totalCost
        }, 0) / quantity
    )
}

const getTotalQuantity = (trades: Trade[]) => {
    return trades.reduce((acc, curr) => acc + curr.quantity, 0)
}

export const condenseTrades = (trades: Trade[]): TradeWithPL[] => {
    const tradeMap: { [x: string]: { entries: Trade[]; closes?: Trade[] } } = {}
    const condensedTrades: Trade[] = []
    // Slice creates a new array as to not mutate the original list (and make strict mode happy).
    const sortedTrades = trades.slice().sort((a, b) => (moment(a.openDate).isAfter(moment(b.openDate)) ? 1 : -1))
    sortedTrades.forEach((trade): any => {
        const { close, side, symbol, traderId } = trade
        if (close) {
            // If the trade is already condensed, push it to the result.
            condensedTrades.push(trade)
            return
        }

        const t = tradeMap[symbol]
        if (!t) {
            // Save the initial trade entry for later use.
            tradeMap[symbol] = { entries: [trade] }
            return
        }

        // If the side is the same as the intial trade, this trade is another entry.
        if (side === t.entries[0].side) {
            tradeMap[symbol].entries.push(trade)
            return
        }

        if (t.closes) {
            t.closes.push(trade)
        } else {
            t.closes = [trade]
        }

        const entriesQuantity = getTotalQuantity(t.entries)
        const exitsQuantity = getTotalQuantity(t.closes)

        // Once our total exit quantity matches our entries' quantities, we can condense them into one trade.
        if (entriesQuantity === exitsQuantity) {
            // Reset the symbol in the map to prepare for another trade.
            delete tradeMap[symbol]

            return condensedTrades.push({
                symbol,
                entry: roundThree(getAveragePrice(t.entries, entriesQuantity)),
                close: roundThree(getAveragePrice(t.closes, exitsQuantity)),
                traderId,
                openDate: t.entries[0].openDate,
                closeDate: t.closes[t.closes.length - 1].openDate,
                id: t.entries[0].id,
                quantity: entriesQuantity,
                side: t.entries[0].side
            })
        }
    })

    // Loop through remaining entries and add them to condensed trades but without a close since there is a quantity still open.
    Object.keys(tradeMap).forEach((symbol) => {
        const t = tradeMap[symbol]
        const { traderId } = t.entries[0]
        const quantity = getTotalQuantity(t.entries)
        const averageEntry = getAveragePrice(t.entries, quantity)
        condensedTrades.push({
            symbol,
            entry: roundThree(averageEntry),
            traderId,
            openDate: t.entries[0].openDate,
            id: t.entries[0].id,
            quantity,
            side: t.entries[0].side
        })
    })

    return condensedTrades.map((trade) => {
        const { entry, close, quantity, side } = trade
        return {
            ...trade,
            profitLoss: !close ? 0 : getProfitLoss(entry, close, quantity, side)
        }
    })
}
