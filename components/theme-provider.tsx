"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme?: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}) => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme") as Theme | null
      return storedTheme || defaultTheme
    }
    return defaultTheme
  })

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const root = window.document.documentElement

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.remove(isDark ? "light" : "dark")
      if (enableSystem) {
        root.setAttribute(attribute, "system")
      }
    } else if (theme) {
      root.setAttribute(attribute, theme)
      window.localStorage.setItem("theme", theme)
      root.classList.remove(theme === "dark" ? "light" : "dark")
    }
  }, [theme, attribute, enableSystem])

  const contextValue: ThemeContextProps = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

function useTheme() {
  return React.useContext(ThemeContext)
}

export { ThemeProvider, useTheme }
