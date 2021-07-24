export const ISOtoStandard = (date?: string) => {
    if (!date) {
        return ''
    }
    return date.replace('T', ' ').replace('.000Z', '')
}
