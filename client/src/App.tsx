import Landing from "./pages/Landing"
import { ThemeProvider } from '@/components/Theme/theme-provider'

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Landing />
    </ThemeProvider>
  )
}

export default App