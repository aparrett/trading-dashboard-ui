import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FC } from 'react'
import { InputField } from './InputField'
import { Formik, FormikValues, Form } from 'formik'

interface RegisterDialogProps {
    open: boolean
    onClose: () => void
}

const RegisterDialog: FC<RegisterDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={async (values: FormikValues, { setErrors }) => {
                    console.log(values)
                    const errors = null
                    if (errors) {
                        setErrors(errors)
                    }
                }}
            >
                <Form>
                    <DialogTitle>REGISTER</DialogTitle>
                    <DialogContent>
                        <InputField autoFocus margin="dense" name="username" label="USERNAME" fullWidth />
                        <InputField margin="dense" name="email" label="EMAIL ADDRESS" type="email" fullWidth />
                        <InputField margin="dense" name="password" label="PASSWORD" type="password" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <button className="button link light" onClick={onClose}>
                            CANCEL
                        </button>
                        <button className="button link dark" type="submit">
                            REGISTER
                        </button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    )
}

export default RegisterDialog
