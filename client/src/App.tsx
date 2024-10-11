import { NavbarDemo } from '@/components/Navbar/Navbar'
import { ThemeProvider } from "@/components/Theme/theme-provider"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarDemo />
    </ThemeProvider>
  )
}

export default App