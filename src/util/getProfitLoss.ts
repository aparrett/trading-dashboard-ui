import { roundPenny } from './roundPenny'

export const getProfitLoss = (entry: number, close: number, quantity: number, side: string) => {
    if (side === 'Long') {
        return roundPenny(quantity * (close - entry))
    }
    return roundPenny(quantity * (entry - close))
}
