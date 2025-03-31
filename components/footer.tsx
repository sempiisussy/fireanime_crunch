import Link from "next/link"
import { FlameIcon as Fire } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-background py-10 border-t border-border/40">
      <div className="crunchyroll-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Fire className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FireAnime</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your ultimate anime streaming platform</p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase mb-4 text-white/70">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/trending" className="text-sm text-muted-foreground hover:text-primary">
                Trending
              </Link>
              <Link href="/new-releases" className="text-sm text-muted-foreground hover:text-primary">
                New Releases
              </Link>
              <Link href="/calendar" className="text-sm text-muted-foreground hover:text-primary">
                Calendar
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase mb-4 text-white/70">Browse</h3>
            <div className="flex flex-col gap-2">
              <Link href="/genres" className="text-sm text-muted-foreground hover:text-primary">
                All Genres
              </Link>
              <Link
                href={`/genre/${btoa("Action").replaceAll("=", "")}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Action
              </Link>
              <Link
                href={`/genre/${btoa("Comedy").replaceAll("=", "")}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Comedy
              </Link>
              <Link
                href={`/genre/${btoa("Drama").replaceAll("=", "")}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Drama
              </Link>
              <Link
                href={`/genre/${btoa("Fantasy").replaceAll("=", "")}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Fantasy
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase mb-4 text-white/70">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/20">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} FireAnime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

