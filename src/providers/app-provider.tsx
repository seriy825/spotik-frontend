'use client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { selectUserData } from 'store/auth/selects'
import QueryClientProvider from 'providers/query-client'
import { AbilityContext } from 'casl'
import defineAbilityFor from 'casl/ability'

export function AppProviders({ children }): React.ReactNode {
  const userData = selectUserData()

  return (
    <AbilityContext.Provider value={defineAbilityFor(userData)}>
      <QueryClientProvider>
        {children}
        <ToastContainer
          limit={2}
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </QueryClientProvider>
    </AbilityContext.Provider>
  )
}
