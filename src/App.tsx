import MainPage from './pages/MainPage'
import EnvironmentError from './components/EnvironmentError'
import useEnvironmentValidation from './hooks/useEnvironmentValidation'

function App() {
  const { isValid, missingVariables } = useEnvironmentValidation();

  if (!isValid) {
    return <EnvironmentError missingVariables={missingVariables} />;
  }

  return (
      <MainPage />
  )
}

export default App
