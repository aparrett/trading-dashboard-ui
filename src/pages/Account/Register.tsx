import { FC } from 'react'
import { useFormik } from 'formik'
import { useRegisterMutation, MeQuery, MeDocument } from '../../generated/graphql'
import { Grid, Paper, TextField } from '@material-ui/core'
import { toErrorMap } from '../../util/toErrorMap'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Register: FC = () => {
    const [register] = useRegisterMutation()
    const history = useHistory()
    const location = useLocation<{ from: string | undefined }>()

    const formik = useFormik({
        initialValues: { email: '', username: '', password: '' },
        onSubmit: async (values, { setErrors, resetForm }) => {
            const response = await register({
                variables: { options: values },
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: 'Query',
                            me: data?.register.user
                        }
                    })
                }
            })

            const errors = response?.data?.register?.errors
            const user = response?.data?.register?.user
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
                    <h1 className="title">Register</h1>
                </Paper>
                <Paper className="paper">
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
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                            Register
                        </button>
                        <p>
                            Already registered? Click <Link to="/login">here</Link> to login.
                        </p>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Register
