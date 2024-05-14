'use client'
import { useEffect } from 'react'
import { FormikProps, useFormik } from 'formik'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthApi, SignInDTO, SignUpDTO } from 'api/auth/auth-api'
import { useAuthState } from 'store/auth/state'
import { signInSchema, signUpSchema } from '../_utils'
import { AUTH_ROUTES, LIBRARY_ROUTES } from 'config/routes'
import { AUTH_QUERY_KEYS } from 'shared/constants/query-keys'
import { API_BASE_URL } from 'config/variables'
import { selectIsLoggedIn } from 'store/auth/selects'

export const useAuthPage = () => {
  const { setLoggedIn, setUser } = useAuthState()
  const { replace } = useRouter()
  const isLoggedIn = selectIsLoggedIn()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { data, isSuccess } = useQuery({
    queryKey: [AUTH_QUERY_KEYS.googleAuth],
    queryFn: async () => await AuthApi.signGoogle(token),
    enabled: !!token,
    refetchOnWindowFocus: false,
  })

  const initialSignInValues = {
    email: searchParams.get('email') || '',
    password: '',
  }

  const initialSignUpValues = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  }

  const loginMutation = useMutation({
    mutationFn: AuthApi.signIn,
    onSuccess: async ({ accessToken, user }) => {
      setLoggedIn(accessToken)
      setUser(user)
      replace(LIBRARY_ROUTES.ROOT.path)
    },
  })

  const registerMutation = useMutation({
    mutationFn: AuthApi.signUp,
    onSuccess: async ({ email }) => {
      replace(`${AUTH_ROUTES.SIGNIN_PAGE.path}?email=${email}`)
    },
  })

  const handleSignInSubmit = (values: SignInDTO) => {
    loginMutation.mutate(values)
  }

  const handleSignUpSubmit = (values: SignUpDTO) => {
    registerMutation.mutate(values)
  }

  const formikSignIn: FormikProps<SignInDTO> = useFormik({
    initialValues: initialSignInValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      handleSignInSubmit(values)
    },
  })

  const formikSignUp: FormikProps<SignUpDTO> = useFormik({
    initialValues: initialSignUpValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      handleSignUpSubmit(values)
    },
  })

  const handleGoogleSignIn = () => {
    replace(`${API_BASE_URL}/auth/google`)
  }

  const isSignInLoading = loginMutation.isPending
  const isSignUpLoading = registerMutation.isPending

  useEffect(() => {
    if (isSuccess) setLoggedIn(data.accessToken)
  }, [isSuccess])

  useEffect(() => {
    if (isLoggedIn) replace(LIBRARY_ROUTES.LIBRARY.path)
  }, [])

  return {
    models: {
      formikSignIn,
      formikSignUp,
      isSignUpLoading,
      isSignInLoading,
    },
    commands: {
      handleGoogleSignIn,
    },
  }
}
