'use client'
import { SignInDTO } from 'api/auth/auth-api'
import { Button } from 'components/ui/button/button'
import { Icon } from 'components/ui/icon/icon'
import { ICON_COLLECTION } from 'components/ui/icon/icon-list'
import { Input } from 'components/ui/input/Input'
import { AUTH_ROUTES } from 'config/routes'
import { FormikProps } from 'formik'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export interface ISignInForm {
  formik: FormikProps<SignInDTO>
  isLoading: boolean
  handleGoogleSignIn: () => void
}
export const SignInForm: React.FC<ISignInForm> = (props) => {
  const { formik, isLoading, handleGoogleSignIn } = props
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')
  const changePasswordInputType = () => {
    setPasswordInputType((prevState) =>
      prevState === 'text' ? 'password' : 'text'
    )
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    formik.submitForm()
  }
  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label className='text-sm md:text-lg'>Enter your e-mail</label>
        <Input
          placeholder='E-mail'
          type='email'
          {...formik.getFieldProps('email')}
          autoComplete='on'
          error={formik.touched.email && !!formik.errors.email}
          errorText={formik.errors.email}
          disabled={isLoading}
          readOnly={isLoading}
        />
      </div>
      <div className='mb-7'>
        <label className='text-sm md:text-lg'>Enter your password</label>
        <Input
          placeholder='Password'
          type={passwordInputType}
          {...formik.getFieldProps('password')}
          autoComplete='on'
          error={formik.touched.password && !!formik.errors.password}
          errorText={formik.errors.password}
          disabled={isLoading}
          readOnly={isLoading}
          endAdornment={
            passwordInputType === 'password' ? (
              <Button
                label={<Icon icon={ICON_COLLECTION.showPassword} />}
                mode='text'
                type='button'
                onClick={changePasswordInputType}
              />
            ) : (
              <Button
                label={<Icon icon={ICON_COLLECTION.hidePassword} />}
                mode='text'
                type='button'
                onClick={changePasswordInputType}
              />
            )
          }
        />
      </div>
      <div className='flex items-center justify-center flex-col gap-5'>
        <Button
          type='button'
          label={
            <span className='flex items-center gap-5'>
              <Icon icon={ICON_COLLECTION.google} />
              <span>Sign In with Google</span>
            </span>
          }
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className='bg-gray-500 hover:bg-gray-600 active:bg-gray-800'
        />
        <Button
          label='Sign In'
          type='submit'
          disabled={isLoading}
          isLoading={isLoading}
          className='bg-gray-500 hover:bg-gray-600 active:bg-gray-800'
        />
        <Link
          href={AUTH_ROUTES.FORGOT_PASSWORD_PAGE.path}
          className='text-violet-800 hover:text-indigo-700 drop-shadow-sm text-sm md:text-lg'
        >
          Forgot your password?
        </Link>
        <span className='drop-shadow-sm text-sm md:text-lg'>
          {"Don't have an account? "}
          <Link
            href={AUTH_ROUTES.SIGNUP_PAGE.path}
            className='text-violet-800 hover:text-indigo-700'
          >
            Sign up here
          </Link>
        </span>
      </div>
    </form>
  )
}
