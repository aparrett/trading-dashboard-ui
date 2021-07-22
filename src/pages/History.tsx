import { FC, useState } from 'react'
import ImportTradesDialog from '../components/ImportTradesDialog'
import { useMeQuery } from '../generated/graphql'

const History: FC = () => {
    const [showImportDialog, setShowImportDialog] = useState(false)

    const { data: meData } = useMeQuery()
    return meData?.me ? (
        <div>
            <button className="button light link" onClick={() => setShowImportDialog(true)}>
                Import
            </button>
            <pre>{`{ "test": "string" }`}</pre>
            <pre>{`{`}</pre>
            <pre>"test":"string"</pre>
            <pre>{`}`}</pre>

            <ImportTradesDialog open={showImportDialog} onClose={() => setShowImportDialog(false)} />
        </div>
    ) : (
        <div>Login to start importing and analyzing your trades.</div>
    )
}

export default History
