import { FC, useState } from 'react'
import ImportTradesDialog from '../components/ImportTradesDialog'

const History: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)
    return <div>
        <button className="button light link" onClick={() => setShowImportDialog(true)}>Import JSON</button>
            <ImportTradesDialog open={showImportDialog} onClose={() => setShowImportDialog(false)} />
        </div>
}


export default History
