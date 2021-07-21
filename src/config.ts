export const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://trading-dashboard-api.herokuapp.com/graphql'
        : 'http://localhost:4000/graphql'
