'use client'
import { SignUpForm } from '../_components/forms/sign-up-form'
import { useAuthPage } from '../_hooks/use-auth-page'

export default function SignUpPage() {
  const { commands, models } = useAuthPage()
  return (
    <>
      <h1 className='text-lg md:text-2xl font-bold mb-4 text-center'>
        Sign Up in the world of music
      </h1>
      <SignUpForm
        formik={models.formikSignUp}
        isLoading={models.isSignUpLoading}
        handleGoogleSignUp={commands.handleGoogleSignIn}
      />
    </>
  )
}
