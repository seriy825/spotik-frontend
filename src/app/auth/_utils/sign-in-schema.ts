import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .test(
      'passwordStrenght',
      'Password must be 8 characters long and contain 1 special character',
      (value) => {
        if (!value) return false
        if (
          value.match(/[a-zA-Z]+/) &&
          value.match(/[0-9]+/) &&
          value.match(/[!@#$%^&*()\-=_+{};':"|,.<>?]+/)
        )
          return true
        return false
      }
    )
    .required('Password is required'),
})
