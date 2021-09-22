import { DataGrid, GridValueGetterParams } from '@material-ui/data-grid'
import { FC } from 'react'
import { TradeWithPL } from '../../types'
import { getProfitClass } from '../../util/getProfitClass'
import { ISOtoStandard } from '../../util/ISOtoStandard'
import { TradesTableFooter } from './TradesTableFooter'

interface TradesTableProps {
    selectedIds: number[]
    setSelectedIds: (selectedIds: number[]) => void
    trades: TradeWithPL[]
}

export const TradesTable: FC<TradesTableProps> = ({ selectedIds, setSelectedIds, trades }) => {
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
    return (
        <div className="trades-table-wrapper">
            <DataGrid
                columns={columns}
                rows={trades}
                checkboxSelection
                density="compact"
                disableColumnMenu
                onSelectionModelChange={(selected) => {
                    setSelectedIds(selected as number[])
                }}
                getCellClassName={(params) => {
                    if (params.field !== 'profitLoss') {
                        return ''
                    }
                    return getProfitClass(Number(params.value))
                }}
                components={{ Footer: TradesTableFooter }}
                componentsProps={{ footer: { selectedIds } }}
            />
        </div>
    )
}
