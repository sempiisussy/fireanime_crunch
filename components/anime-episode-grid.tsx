import type { NewestAnimeEpisode } from "@/lib/api"
import AnimeEpisodeCard from "./anime-episode-card"

interface AnimeGridProps {
  animes: NewestAnimeEpisode[]
  title?: string
  className?: string
  showViewAll?: boolean
  viewAllLink?: string
}

const AnimeEpisodeGrid = ({ animes, title, className = "", showViewAll = false, viewAllLink = "" }: AnimeGridProps) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {animes.map((anime) => (
          <AnimeEpisodeCard key={anime.episode_id} anime={anime} />
        ))}
      </div>
    </div>
  )
}

export default AnimeEpisodeGrid

