"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, User, ChevronDown, FlameIcon as Fire } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { ThemeToggle } from "./theme-toggle"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      <div className="crunchyroll-container">
        <div className="flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-r border-border/40">
              <div className="flex items-center mb-8 mt-4">
                <Fire className="h-6 w-6 text-primary mr-2" />
                <span className="text-xl font-bold">FireAnime</span>
              </div>
              <nav className="flex flex-col gap-1">
                <Link href="/" className="crunchyroll-nav-item">
                  Home
                </Link>
                <Link href="/trending" className="crunchyroll-nav-item">
                  Trending
                </Link>
                <Link href="/new-releases" className="crunchyroll-nav-item">
                  New Releases
                </Link>
                <Link href="/calendar" className="crunchyroll-nav-item">
                  Calendar
                </Link>
                <Link href="/genres" className="crunchyroll-nav-item">
                  Browse
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 mr-8">
            <Fire className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FireAnime</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="crunchyroll-nav-item">
              Home
            </Link>
            <Link href="/trending" className="crunchyroll-nav-item">
              Trending
            </Link>
            <Link href="/new-releases" className="crunchyroll-nav-item">
              New Releases
            </Link>
            <Link href="/calendar" className="crunchyroll-nav-item">
              Calendar
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="crunchyroll-nav-item flex items-center">
                  Browse <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background border border-border/40 w-48">
                <DropdownMenuItem asChild>
                  <Link href="/genres" className="w-full">
                    All Genres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/genre/${btoa("Action").replaceAll("=", "")}`} className="w-full">
                    Action
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/genre/${btoa("Comedy").replaceAll("=", "")}`} className="w-full">
                    Comedy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/genre/${btoa("Drama").replaceAll("=", "")}`} className="w-full">
                    Drama
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/genre/${btoa("Fantasy").replaceAll("=", "")}`} className="w-full">
                    Fantasy
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center ml-auto">
            {showSearch ? (
              <form onSubmit={handleSearch} className="relative mr-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search anime..."
                  className="w-[200px] lg:w-[300px] pl-8 bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setShowSearch(false)
                  }}
                />
              </form>
            ) : (
              <Button variant="ghost" size="icon" className="mr-2 text-foreground" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="ml-2 text-foreground">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

