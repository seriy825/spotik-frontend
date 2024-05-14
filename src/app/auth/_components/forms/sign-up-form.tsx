'use client'
import { SignUpDTO } from 'api/auth/auth-api'
import { Button } from 'components/ui/button/button'
import { Icon } from 'components/ui/icon/icon'
import { ICON_COLLECTION } from 'components/ui/icon/icon-list'
import { Input } from 'components/ui/input/Input'
import { AUTH_ROUTES } from 'config/routes'
import { FormikProps } from 'formik'
import Link from 'next/link'
import { FormEvent, FormEventHandler, useState } from 'react'

export interface ISignUpForm {
  formik: FormikProps<SignUpDTO>
  isLoading: boolean
  handleGoogleSignUp: () => void
}
export const SignUpForm: React.FC<ISignUpForm> = (props) => {
  const { formik, isLoading, handleGoogleSignUp } = props
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState<
    'text' | 'password'
  >('password')
  const changePasswordInputType = () => {
    setPasswordInputType((prevState) =>
      prevState === 'text' ? 'password' : 'text'
    )
  }
  const changeConfirmPasswordInputType = () => {
    setConfirmPasswordInputType((prevState) =>
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
      <div className='mb-3'>
        <label className='text-sm md:text-lg'>Enter your name</label>
        <Input
          placeholder='Login'
          type='text'
          {...formik.getFieldProps('name')}
          autoComplete='on'
          error={formik.touched.name && !!formik.errors.name}
          errorText={formik.errors.name}
          disabled={isLoading}
          readOnly={isLoading}
        />
      </div>
      <div className='mb-3'>
        <label className='text-sm md:text-lg'>Create a password</label>
        <Input
          placeholder='Password'
          type={passwordInputType}
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
          {...formik.getFieldProps('password')}
          autoComplete='on'
          error={formik.touched.password && !!formik.errors.password}
          errorText={formik.errors.password}
        />
      </div>
      <div className='mb-7'>
        <label className='text-sm md:text-lg'>Confirm your password</label>
        <Input
          placeholder='Confirm password'
          type={confirmPasswordInputType}
          disabled={isLoading}
          readOnly={isLoading}
          endAdornment={
            confirmPasswordInputType === 'password' ? (
              <Button
                label={<Icon icon={ICON_COLLECTION.showPassword} />}
                mode='text'
                type='button'
                onClick={changeConfirmPasswordInputType}
              />
            ) : (
              <Button
                label={<Icon icon={ICON_COLLECTION.hidePassword} />}
                mode='text'
                type='button'
                onClick={changeConfirmPasswordInputType}
              />
            )
          }
          {...formik.getFieldProps('passwordConfirmation')}
          autoComplete='on'
          error={
            formik.touched.passwordConfirmation &&
            !!formik.errors.passwordConfirmation
          }
          errorText={formik.errors.passwordConfirmation}
        />
      </div>
      <div className='flex items-center justify-center flex-col gap-5'>
        <Button
          type='button'
          label={
            <span className='flex items-center gap-5'>
              <Icon icon={ICON_COLLECTION.google} />
              <span>Sign Up with Google</span>
            </span>
          }
          disabled={isLoading}
          className='bg-gray-500 hover:bg-gray-600 active:bg-gray-800'
          onClick={handleGoogleSignUp}
        />
        <Button
          label='Sign Up'
          className='bg-gray-500 hover:bg-gray-600 active:bg-gray-800'
          type='submit'
          disabled={isLoading}
          isLoading={isLoading}
        />
        <span className='drop-shadow-sm text-sm md:text-lg'>
          {'Already have an account? '}
          <Link
            href={AUTH_ROUTES.SIGNIN_PAGE.path}
            className='text-violet-800 hover:text-indigo-700'
          >
            Sign in here
          </Link>
        </span>
      </div>
    </form>
  )
}
