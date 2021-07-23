import { FC, useState } from 'react'
import ImportTradesDialog from '../components/ImportTradesDialog'
import { useMeQuery, useTradesQuery } from '../generated/graphql'
import { DataGrid } from '@material-ui/data-grid'

const History: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)
    const { data: meData } = useMeQuery()
    const { data: tradesData } = useTradesQuery()
    const trades = tradesData?.trades || []
    const columns = [
        { field: 'symbol', headerName: 'Symbol' },
        { field: 'side', headerName: 'Side' },
        { field: 'quantity', headerName: 'Qty' },
        { field: 'entry', headerName: 'Entry' },
        { field: 'close', headerName: 'Close' },
        { field: 'openDate', headerName: 'Open Date', width: 210 },
        { field: 'closeDate', headerName: 'Close Date', width: 210 }
    ]

    return (
        <div>
            <h1>History</h1>
            {meData?.me ? (
                <div>
                    <button className="button light link" onClick={() => setShowImportDialog(true)}>
                        Import
                    </button>
                    <div className="trades-table-wrapper">
                        <DataGrid
                            disableColumnMenu
                            columns={columns}
                            rows={trades}
                            checkboxSelection
                            density="compact"
                        />
                    </div>
                    <ImportTradesDialog open={showImportDialog} onClose={() => setShowImportDialog(false)} />
                </div>
            ) : (
                <div>Login to start importing and analyzing your trades.</div>
            )}
        </div>
    )
}

export default History
