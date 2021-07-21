import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FC } from 'react'
import { useFormik } from 'formik'
import { MeQuery, MeDocument, useLoginMutation } from '../generated/graphql'
import { TextField } from '@material-ui/core'
import { toErrorMap } from '../util/toErrorMap'
import { useAuthDispatch } from '../context/AuthContext'

interface LoginDialogProps {
    open: boolean
    onClose: () => void
}

const LoginDialog: FC<LoginDialogProps> = ({ open, onClose }) => {
    const [login] = useLoginMutation()
    const dispatch = useAuthDispatch()
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: async (values, { setErrors }) => {
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
                dispatch({ type: 'auth', payload: user })
                onClose()
            }
        }
    })
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>LOGIN</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="USERNAME"
                        fullWidth
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="PASSWORD"
                        type="password"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </DialogContent>
                <DialogActions>
                    <button className="button link light" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="button link dark" type="submit">
                        LOGIN
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default LoginDialog
