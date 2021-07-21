import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FC } from 'react'
import { useFormik } from 'formik'
import { useRegisterMutation, MeQuery, MeDocument } from '../generated/graphql'
import { TextField } from '@material-ui/core'
import { toErrorMap } from '../util/toErrorMap'
import { useAuthDispatch } from '../context/AuthContext'

interface RegisterDialogProps {
    open: boolean
    onClose: () => void
}

const RegisterDialog: FC<RegisterDialogProps> = ({ open, onClose }) => {
    const [register] = useRegisterMutation()
    const dispatch = useAuthDispatch()
    const formik = useFormik({
        initialValues: { email: '', username: '', password: '' },
        onSubmit: async (values, { setErrors }) => {
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
                dispatch({ type: 'auth', payload: user })
                onClose()
            }
        }
    })
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>REGISTER</DialogTitle>
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
                        name="email"
                        label="EMAIL ADDRESS"
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
                        REGISTER
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default RegisterDialog
