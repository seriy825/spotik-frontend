'use client'
import { SignInForm } from './_components/forms/sign-in-form'
import { useAuthPage } from './_hooks/use-auth-page'

export default function SignInPage() {
  const { models, commands } = useAuthPage()
  return (
    <>
      <h1 className='text-lg md:text-2xl font-bold mb-4'>Log In</h1>
      <SignInForm
        formik={models.formikSignIn}
        isLoading={models.isSignInLoading}
        handleGoogleSignIn={commands.handleGoogleSignIn}
      />
    </>
  )
}
