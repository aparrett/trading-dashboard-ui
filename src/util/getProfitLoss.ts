import { roundThree } from './roundPenny'

export const getProfitLoss = (entry: number, close: number, quantity: number, side: string) => {
    if (side === 'Long') {
        return roundThree(quantity * (close - entry))
    }
    return roundThree(quantity * (entry - close))
}
