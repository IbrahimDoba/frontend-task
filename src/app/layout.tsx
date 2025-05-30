import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weather App",
  description: "Check weather conditions for cities around the world",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <footer className="py-6 border-t">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Weather App. Created by Ibrahim Doba
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
