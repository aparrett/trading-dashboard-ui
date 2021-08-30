import moment from 'moment'

export const formatImportDate = (date: string | null) => {
    return !date ? null : moment(date).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z'
}
