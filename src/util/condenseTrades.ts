import { Trade } from '../generated/graphql'
import moment from 'moment'

export const condenseTrades = (trades: Trade[]) => {
    const tradeMap: { [x: string]: { entries: Trade[]; closes?: Trade[] } } = {}
    const condensedTrades: Trade[] = []
    const sortedTrades = trades.sort((a, b) => (moment(a.openDate).isAfter(moment(b.openDate)) ? 1 : -1))
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

        const entriesQuantity = t.entries.reduce((acc, curr) => acc + curr.quantity, 0)
        const exitsQuantity = t.closes.reduce((acc, curr) => acc + curr.quantity, 0)

        // Once our total exit quantity matches our entries' quantities, we can condense them into one trade.
        if (entriesQuantity === exitsQuantity) {
            const averageEntry =
                t.entries.reduce((acc, trade) => {
                    const totalCost = trade.quantity * trade.entry
                    return acc + totalCost
                }, 0) / entriesQuantity
            const averageClose =
                t.closes.reduce((acc, trade) => {
                    // It's a little weird but trades that haven't been condensed yet will only have an entry
                    const totalCost = trade.quantity * trade.entry
                    return acc + totalCost
                }, 0) / exitsQuantity

            // Reset the symbol in the map to prepare for another trade.
            delete tradeMap[symbol]

            return condensedTrades.push({
                symbol,
                entry: averageEntry,
                close: averageClose,
                traderId,
                openDate: t.entries[0].openDate,
                closeDate: t.closes[t.closes.length - 1].openDate,
                id: t.entries[0].id,
                quantity: entriesQuantity,
                side: t.entries[0].side
            })
        }
    })
    return condensedTrades
}
