export const getProfitClass = (n: number) => {
    if (n > 0) {
        return 'green'
    } else if (n < 0) {
        return 'red'
    }
    return ''
}
