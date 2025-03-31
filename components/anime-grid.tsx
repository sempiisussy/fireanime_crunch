import type { AnimeFromGenre, AnimeSearchItem } from "@/lib/api"
import AnimeCard from "./anime-card"

interface AnimeGridProps {
  animes: AnimeSearchItem[] | AnimeFromGenre[]
  title?: string
  className?: string
  showViewAll?: boolean
  viewAllLink?: string
}

const AnimeGrid = ({ animes, title, className = "", showViewAll = false, viewAllLink = "" }: AnimeGridProps) => {
  if (animes.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">No anime found</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="crunchyroll-section-title">{title}</h2>
          {showViewAll && (
            <a href={viewAllLink} className="text-sm text-primary hover:underline">
              View All
            </a>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
}

export default AnimeGrid

