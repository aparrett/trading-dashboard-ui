import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any
}

export type FieldError = {
    __typename?: 'FieldError'
    field: Scalars['String']
    message: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    changePassword: UserResponse
    forgotPassword: Scalars['Boolean']
    register: UserResponse
    login: UserResponse
    logout: Scalars['Boolean']
    saveTrades: Array<Trade>
    deleteTrades: Scalars['Boolean']
}

export type MutationChangePasswordArgs = {
    newPassword: Scalars['String']
    token: Scalars['String']
}

export type MutationForgotPasswordArgs = {
    email: Scalars['String']
}

export type MutationRegisterArgs = {
    options: UsernamePasswordInput
}

export type MutationLoginArgs = {
    password: Scalars['String']
    usernameOrEmail: Scalars['String']
}

export type MutationSaveTradesArgs = {
    trades: Array<TradeInput>
}

export type MutationDeleteTradesArgs = {
    ids: Array<Scalars['Int']>
}

export type Query = {
    __typename?: 'Query'
    me?: Maybe<User>
    trades: Array<Trade>
}

export type Trade = {
    __typename?: 'Trade'
    id: Scalars['Float']
    traderId: Scalars['Float']
    symbol: Scalars['String']
    side: Scalars['String']
    quantity: Scalars['Float']
    entry: Scalars['Float']
    close?: Maybe<Scalars['Float']>
    openDate: Scalars['DateTime']
    closeDate?: Maybe<Scalars['DateTime']>
}

export type TradeInput = {
    symbol: Scalars['String']
    side: Scalars['String']
    quantity: Scalars['Float']
    entry: Scalars['Float']
    close?: Maybe<Scalars['Float']>
    openDate: Scalars['DateTime']
    closeDate?: Maybe<Scalars['DateTime']>
}

export type User = {
    __typename?: 'User'
    id: Scalars['Float']
    username: Scalars['String']
    email: Scalars['String']
    createdAt: Scalars['String']
    updatedAt: Scalars['String']
}

export type UserResponse = {
    __typename?: 'UserResponse'
    errors?: Maybe<Array<FieldError>>
    user?: Maybe<User>
}

export type UsernamePasswordInput = {
    email: Scalars['String']
    username: Scalars['String']
    password: Scalars['String']
}

export type DeleteTradesMutationVariables = Exact<{
    ids: Array<Scalars['Int']>
}>

export type DeleteTradesMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTrades'>

export type LoginMutationVariables = Exact<{
    username: Scalars['String']
    password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'UserResponse' } & {
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
        errors?: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>>
    }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>

export type RegisterMutationVariables = Exact<{
    options: UsernamePasswordInput
}>

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'UserResponse' } & {
        errors?: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>>
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
    }
}

export type SaveTradesMutationVariables = Exact<{
    trades: Array<TradeInput>
}>

export type SaveTradesMutation = { __typename?: 'Mutation' } & {
    saveTrades: Array<
        { __typename?: 'Trade' } & Pick<
            Trade,
            'id' | 'symbol' | 'side' | 'quantity' | 'entry' | 'close' | 'openDate' | 'closeDate'
        >
    >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & { me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>> }

export type TradesQueryVariables = Exact<{ [key: string]: never }>

export type TradesQuery = { __typename?: 'Query' } & {
    trades: Array<
        { __typename?: 'Trade' } & Pick<
            Trade,
            'id' | 'symbol' | 'side' | 'quantity' | 'entry' | 'close' | 'openDate' | 'closeDate'
        >
    >
}

export const DeleteTradesDocument = gql`
    mutation DeleteTrades($ids: [Int!]!) {
        deleteTrades(ids: $ids)
    }
`
export type DeleteTradesMutationFn = ApolloReactCommon.MutationFunction<
    DeleteTradesMutation,
    DeleteTradesMutationVariables
>

/**
 * __useDeleteTradesMutation__
 *
 * To run a mutation, you first call `useDeleteTradesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTradesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTradesMutation, { data, loading, error }] = useDeleteTradesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteTradesMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTradesMutation, DeleteTradesMutationVariables>
) {
    return ApolloReactHooks.useMutation<DeleteTradesMutation, DeleteTradesMutationVariables>(
        DeleteTradesDocument,
        baseOptions
    )
}
export type DeleteTradesMutationHookResult = ReturnType<typeof useDeleteTradesMutation>
export type DeleteTradesMutationResult = ApolloReactCommon.MutationResult<DeleteTradesMutation>
export type DeleteTradesMutationOptions = ApolloReactCommon.BaseMutationOptions<
    DeleteTradesMutation,
    DeleteTradesMutationVariables
>
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
        login(usernameOrEmail: $username, password: $password) {
            user {
                id
                username
            }
            errors {
                field
                message
            }
        }
    }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
    return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
    return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
    return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>
export const SaveTradesDocument = gql`
    mutation SaveTrades($trades: [TradeInput!]!) {
        saveTrades(trades: $trades) {
            id
            symbol
            side
            quantity
            entry
            close
            openDate
            closeDate
        }
    }
`
export type SaveTradesMutationFn = ApolloReactCommon.MutationFunction<SaveTradesMutation, SaveTradesMutationVariables>

/**
 * __useSaveTradesMutation__
 *
 * To run a mutation, you first call `useSaveTradesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTradesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTradesMutation, { data, loading, error }] = useSaveTradesMutation({
 *   variables: {
 *      trades: // value for 'trades'
 *   },
 * });
 */
export function useSaveTradesMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<SaveTradesMutation, SaveTradesMutationVariables>
) {
    return ApolloReactHooks.useMutation<SaveTradesMutation, SaveTradesMutationVariables>(
        SaveTradesDocument,
        baseOptions
    )
}
export type SaveTradesMutationHookResult = ReturnType<typeof useSaveTradesMutation>
export type SaveTradesMutationResult = ApolloReactCommon.MutationResult<SaveTradesMutation>
export type SaveTradesMutationOptions = ApolloReactCommon.BaseMutationOptions<
    SaveTradesMutation,
    SaveTradesMutationVariables
>
export const MeDocument = gql`
    query Me {
        me {
            id
            username
        }
    }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
    return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
    return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>
export const TradesDocument = gql`
    query Trades {
        trades {
            id
            symbol
            side
            quantity
            entry
            close
            openDate
            closeDate
        }
    }
`

/**
 * __useTradesQuery__
 *
 * To run a query within a React component, call `useTradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTradesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TradesQuery, TradesQueryVariables>) {
    return ApolloReactHooks.useQuery<TradesQuery, TradesQueryVariables>(TradesDocument, baseOptions)
}
export function useTradesLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TradesQuery, TradesQueryVariables>
) {
    return ApolloReactHooks.useLazyQuery<TradesQuery, TradesQueryVariables>(TradesDocument, baseOptions)
}
export type TradesQueryHookResult = ReturnType<typeof useTradesQuery>
export type TradesLazyQueryHookResult = ReturnType<typeof useTradesLazyQuery>
export type TradesQueryResult = ApolloReactCommon.QueryResult<TradesQuery, TradesQueryVariables>
