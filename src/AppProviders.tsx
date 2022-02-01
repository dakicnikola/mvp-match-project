import {ReactNode, Suspense} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {I18nextProvider} from 'react-i18next'
import {Space, Spin} from 'antd'

import i18n from './localization/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

type AppProvidersProps = {
  children: ReactNode
}

function AppProviders({children}: AppProvidersProps) {
  return (
    <Suspense
      fallback={
        <Space
          direction='vertical'
          align='center'
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spin />
        </Space>
      }
    >
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <Router>
            {children}
          </Router>
        </QueryClientProvider>
      </I18nextProvider>
    </Suspense>
  )
}

export {AppProviders}
