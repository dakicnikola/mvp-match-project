import {Navigate, useLocation, useNavigate, useRoutes} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

import Dashboard from './components/Dashboard'
import {BoardPage, PaymentPage, ReportsPage, SettingsPage, TransactionsPage} from './pages'
import {pathname_reports, pathname_root} from './config/routes'
import {useEffect} from 'react'

function AuthenticatedApp() {
  const element = useRoutes([
    {
      path: pathname_root,
      element: <Dashboard />,
      children: [PaymentPage, BoardPage, TransactionsPage, ReportsPage, SettingsPage,
        {
          path: '*',
          element: <Navigate to={pathname_root} replace />,
        }],
    },
  ])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === pathname_root) {
      navigate(pathname_reports, {replace: true})
    }
  }, [location.pathname, navigate, element])

  return (
    <ErrorBoundary FallbackComponent={() => <div>Something went wrong!</div>}>
      {element}
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
