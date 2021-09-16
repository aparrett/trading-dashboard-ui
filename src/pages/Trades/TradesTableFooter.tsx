import { GridPagination } from '@material-ui/data-grid'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import { TradesDocument, useDeleteTradesMutation } from '../../generated/graphql'

export const TradesTableFooter: FC<{ selectedIds: number[] }> = ({ selectedIds }) => {
    const [deleteTrades] = useDeleteTradesMutation()
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteClick = async () => {
        if (selectedIds.length === 0) {
            return
        }
        const response = await deleteTrades({
            refetchQueries: [{ query: TradesDocument }],
            variables: { ids: selectedIds }
        })

        const success = response?.data?.deleteTrades
        if (success) {
            enqueueSnackbar('Delete success!', { variant: 'success' })
        } else {
            enqueueSnackbar('Delete failed.', { variant: 'error' })
        }
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
