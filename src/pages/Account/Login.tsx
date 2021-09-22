import { FC } from 'react'
import { useFormik } from 'formik'
import { MeQuery, MeDocument, useLoginMutation } from '../../generated/graphql'
import { Grid, Paper, TextField } from '@material-ui/core'
import { toErrorMap } from '../../util/toErrorMap'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Login: FC = () => {
    const [login] = useLoginMutation()
    const history = useHistory()
    const location = useLocation<{ from: string | undefined }>()
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: async (values, { setErrors, resetForm }) => {
            const response = await login({
                variables: { ...values },
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: 'Query',
                            me: data?.login.user
                        }
                    })
                }
            })

            const errors = response?.data?.login?.errors
            const user = response?.data?.login?.user
            if (errors) {
                setErrors(toErrorMap(errors))
            } else if (user) {
                resetForm()
                history.replace(location.state?.from || '/')
            }
        }
    })
    return (
        <Grid container style={{ height: '100%' }}>
            <Grid item sm={4}>
                <Paper className="paper">
                    <h1 className="title">Login</h1>
                </Paper>
                <Paper className="paper">
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="username"
                                label="Username"
                                fullWidth
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                margin="dense"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <button
                                className="button link full"
                                type="submit"
                                style={{ marginTop: '25px', marginBottom: '10px' }}
                            >
                                Login
                            </button>
                            <p>
                                Not registered yet? Click <Link to="/register">here</Link> to create an account.
                            </p>
                        </form>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login
