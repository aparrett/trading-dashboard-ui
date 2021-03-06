import { TradeInput } from '../generated/graphql'
import { formatImportDate } from './formatImportDate'
import { roundThree } from './roundPenny'

export const translateSide = (s: string): string => {
    const side = s.toLowerCase()
    switch (side) {
        case 'b':
            return 'Long'
        case 's':
            return 'Sell'
        case 'ss':
            return 'Short'
        case 'bc':
            return 'Cover'
        default:
            return s
    }
}

export const csvRowToTrade = (row: { [x: string]: any }): TradeInput => {
    return {
        symbol: row.Symbol,
        side: translateSide(row.Side),
        quantity: Number(row.Qty),
        entry: roundThree(Number(row.Price)),
        close: !row.Close ? null : roundThree(Number(row.Close)),
        openDate: formatImportDate(`${row['T/D']} ${row['Exec Time']}`),
        closeDate: formatImportDate(row.CloseDate)
    }
}
