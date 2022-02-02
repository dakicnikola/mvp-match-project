import {useEffect} from 'react'
import {useLocation, useNavigate, useRoutes} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

import Dashboard from './components/Dashboard'
import {BoardPage, PaymentPage, ReportsPage, SettingsPage, TransactionsPage} from './pages'
import {pathname_reports, pathname_root} from './config/routes'

function AuthenticatedApp() {
  const element = useRoutes([
    {
      path: pathname_root,
      element: <Dashboard />,
      children: [PaymentPage, BoardPage, TransactionsPage, ReportsPage, SettingsPage],
    },
  ])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate(pathname_reports)
  }, [location.pathname, navigate])

  return (
    <ErrorBoundary FallbackComponent={() => <div>Something went wrong!</div>}>
      {element}
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
