import { GridPagination } from '@material-ui/data-grid'
import { FC } from 'react'

export const HistoryTableFooter: FC<{ selectedIds: number[] }> = ({ selectedIds }) => {
    const handleDeleteClick = () => {
        if (selectedIds.length === 0) {
            return
        }
        console.log(selectedIds)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="table-delete-btn" onClick={handleDeleteClick}>
                Delete
            </div>
            <GridPagination />
        </div>
    )
}