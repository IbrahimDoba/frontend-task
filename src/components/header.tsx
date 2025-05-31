"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cloud, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Cloud className="h-6 w-6" />
          <span className="font-bold text-xl">Weather App</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/chat"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/chat" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Weather Chat
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <Link href="/chat" className="md:hidden">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
