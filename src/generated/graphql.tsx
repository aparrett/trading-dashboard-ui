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

export type Query = {
    __typename?: 'Query'
    me?: Maybe<User>
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

export type RegisterMutationVariables = Exact<{
    options: UsernamePasswordInput
}>

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'UserResponse' } & {
        errors?: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>>
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
    }
}

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
