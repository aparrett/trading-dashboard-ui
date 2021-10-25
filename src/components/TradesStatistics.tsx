import { Box, Grid, Paper } from '@material-ui/core'
import { FC } from 'react'
import { TradeWithPL } from '../types'
import { getProfitClass } from '../util/getProfitClass'
import { roundTwo } from '../util/roundPenny'

interface TradesStatisticsProps {
    trades: TradeWithPL[]
}

export const TradesStatistics: FC<TradesStatisticsProps> = ({ trades }) => {
    const profit = trades.reduce((acc, trade) => acc + trade.profitLoss, 0)
    const tradesWithoutNeutrals = trades.filter((trade) => trade.profitLoss > 10 || trade.profitLoss < -10)
    const winners = tradesWithoutNeutrals.filter((trade) => trade.profitLoss >= 0)
    const losers = tradesWithoutNeutrals.filter((trade) => trade.profitLoss < 0)
    const averageWinner =
        winners.length === 0 ? 0 : winners.reduce((acc, trade) => acc + trade.profitLoss, 0) / winners.length
    const averageLoser =
        losers.length === 0 ? 0 : losers.reduce((acc, trade) => acc + trade.profitLoss, 0) / losers.length

    const winPercentage =
        winners.length > 0 && tradesWithoutNeutrals.length > 0
            ? Math.round((winners.length / tradesWithoutNeutrals.length) * 100)
            : 0
    return (
        <Grid item sm={12} md={6}>
            <Paper className="paper">
                <Grid container>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between">
                            <div>Trades:</div>
                            <div data-testid="tradesCount">{trades.length}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Winning Trades:</div>
                            <div data-testid="winningTradesCount">{winners.length}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Losing Trades:</div>
                            <div data-testid="losingTradesCount">{losers.length}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Neutral Trades:</div>
                            <div data-testid="neutralTradesCount">{trades.length - tradesWithoutNeutrals.length}</div>
                        </Box>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between">
                            <div>Profit:</div>
                            <div data-testid="profit" className={getProfitClass(profit)}>{roundTwo(profit)}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Average Winner:</div>
                            <div data-testid="avgWinner" className={getProfitClass(averageWinner)}>{roundTwo(averageWinner)}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Average Loser:</div>
                            <div data-testid="avgLoser" className={getProfitClass(averageLoser)}>{roundTwo(averageLoser)}</div>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <div>Win Percentage:</div>
                            <div data-testid="winPerc">{winPercentage}%</div>
                        </Box>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            </Paper>
        </Grid>
    )
}
