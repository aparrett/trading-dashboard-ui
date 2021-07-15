import React from 'react'
import { useField } from 'formik'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

interface InputFieldProps {
    name: string // Make sure name is defined for Formik.
}

export const InputField: React.FC<InputFieldProps & TextFieldProps> = ({ name, ...props }) => {
    const [field, { error }] = useField(name)
    const helperText = error || {}
    return <TextField autoComplete="off" error={!!error} id={field.name} {...helperText} name={name} {...props} />
}
