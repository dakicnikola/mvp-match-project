import AuthenticatedApp from './AuthenticatedApp'
import {AppProviders} from './AppProviders'

function App() {
  return (
    <AppProviders>
      <AuthenticatedApp />
    </AppProviders>
  )
}

export default App
