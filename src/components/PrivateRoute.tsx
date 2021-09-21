import { FC, ReactNode } from 'react'
import { Redirect, Route } from 'react-router'
import { useMeQuery } from '../generated/graphql'

interface PrivateRouteProps {
    children: ReactNode
    path: string
    exact?: boolean
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, path, exact }) => {
    const { data: meData, loading } = useMeQuery()
    
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) => {
                if (loading) {
                    return null
                }
                return meData?.me ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location.pathname }
                        }}
                    />
                )
            }}
        ></Route>
    )
}

export default PrivateRoute
