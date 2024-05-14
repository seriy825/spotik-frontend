import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('Email is required'),
  name: Yup.string().required('Login is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
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
  passwordConfirmation: Yup.string().when('password', (password, field) => {
    if (password[0])
      return field
        .required('Confirm Password must be filled')
        .oneOf(
          [Yup.ref('password')],
          "Password and Confirm Password didn't match"
        )
    return field
  }),
})
