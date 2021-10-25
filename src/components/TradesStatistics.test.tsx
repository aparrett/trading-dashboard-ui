import { render, screen } from '@testing-library/react'
import { TradesStatistics } from './TradesStatistics'

// This component doesn't care about close date, so it is left out. If we wanted to add it, we'd have to change it with profit loss every time or it could be confusing.
const trade = {
    entry: 1,
    id: 1,
    openDate: expect.any(String),
    profitLoss: 1,
    quantity: 1,
    side: 'Long',
    symbol: 'TEST',
    traderId: 1
}

it('renders correctly', () => {
    const wrapper = render(<TradesStatistics trades={[]} />)
    expect(wrapper).toMatchSnapshot()
})

it('renders correctly with a trade', () => {
    const wrapper = render(<TradesStatistics trades={[trade]} />)
    expect(wrapper).toMatchSnapshot()
})

it('should calculate neutrals correctly - 0 trades', () => {
    render(<TradesStatistics trades={[]} />)
    const el = screen.getByTestId('neutralTradesCount')
    expect(el.textContent).toEqual('0')
})

it('should calculate neutrals correctly - two neutrals and one win', () => {
    const trade1 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade, trade]} />)
    const el = screen.getByTestId('neutralTradesCount')
    expect(el.textContent).toEqual('2')
})

it('should calculate average winner correctly - basic', () => {
    const trade1 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade1]} />)
    const el = screen.getByTestId('avgWinner')
    expect(el.textContent).toEqual('100')
})

it('should calculate average winner correctly - 0 winners', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    render(<TradesStatistics trades={[trade1]} />)
    const el = screen.getByTestId('avgWinner')
    expect(el.textContent).toEqual('0')
})

it('should calculate average winner correctly - ignores neutrals', () => {
    const trade1 = { ...trade, profitLoss: 1 }
    const trade2 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade2]} />)
    const el = screen.getByTestId('avgWinner')
    expect(el.textContent).toEqual('100')
})

it('should calculate average winner correctly - ignores losers', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    const trade2 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade2]} />)
    const el = screen.getByTestId('avgWinner')
    expect(el.textContent).toEqual('100')
})

it('should calculate average loser correctly - basic', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    render(<TradesStatistics trades={[trade1, trade1]} />)
    const el = screen.getByTestId('avgLoser')
    expect(el.textContent).toEqual('-100')
})

it('should calculate average loser correctly - 0 losers', () => {
    const trade1 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1]} />)
    const el = screen.getByTestId('avgLoser')
    expect(el.textContent).toEqual('0')
})

it('should calculate average loser correctly - ignores neutrals', () => {
    const trade1 = { ...trade, profitLoss: 1 }
    const trade2 = { ...trade, profitLoss: -100 }
    render(<TradesStatistics trades={[trade1, trade2]} />)
    const el = screen.getByTestId('avgLoser')
    expect(el.textContent).toEqual('-100')
})

it('should calculate average loser correctly - ignores winners', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    const trade2 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade2]} />)
    const el = screen.getByTestId('avgLoser')
    expect(el.textContent).toEqual('-100')
})

it('should calculate win perc correctly - 100%', () => {
    const trade1 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1]} />)
    const el = screen.getByTestId('winPerc')
    expect(el.textContent).toEqual('100%')
})

it('should calculate win perc correctly - 0%', () => {
    const trade1 = { ...trade, profitLoss: 0 }
    render(<TradesStatistics trades={[trade1]} />)
    const el = screen.getByTestId('winPerc')
    expect(el.textContent).toEqual('0%')
})

it('should calculate win perc correctly - 50%', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    const trade2 = { ...trade, profitLoss: 100 }
    render(<TradesStatistics trades={[trade1, trade2]} />)
    const el = screen.getByTestId('winPerc')
    expect(el.textContent).toEqual('50%')
})

it('should calculate win perc correctly - ignores neutrals', () => {
    const trade1 = { ...trade, profitLoss: -100 }
    const trade2 = { ...trade, profitLoss: 100 }
    const trade3 = { ...trade, profitLoss: 0 }
    render(<TradesStatistics trades={[trade1, trade2, trade3]} />)
    const el = screen.getByTestId('winPerc')
    expect(el.textContent).toEqual('50%')
})
