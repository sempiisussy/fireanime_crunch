import Link from "next/link"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { Play } from "lucide-react"
import { API_BASE_IMG_URL, type NewestAnimeEpisode } from "@/lib/api"

interface AnimeCardProps {
  anime: NewestAnimeEpisode
  className?: string
}

const AnimeEpisodeCard = ({ anime, className = "" }: AnimeCardProps) => {
  return (
    <Link href={`/anime/${anime.slug}/${anime.season}/${anime.episode}`}>
      <div className={`group relative overflow-hidden rounded-md ${className}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={
              anime.image
                ? `${API_BASE_IMG_URL}/img/thumbs/${anime.image}`
                : anime.poster
                  ? `${API_BASE_IMG_URL}/img/posters/small-${anime.poster}.webp`
                  : "/placeholder.svg"
            }
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="rounded-full bg-primary/90 p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-black/70 hover:bg-black/70 text-xs">
              S{anime.season} E{anime.episode}
            </Badge>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-medium line-clamp-1 text-sm group-hover:text-primary transition-colors">{anime.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 flex gap-1 w-full">
            {anime.has_ger_sub ? <span className="text-xs px-1 bg-secondary rounded">GER-SUB</span> : ""}
            {anime.has_ger_dub ? <span className="text-xs px-1 bg-secondary rounded">GER-DUB</span> : ""}
            {anime.has_eng_sub ? <span className="text-xs px-1 bg-secondary rounded">ENG-SUB</span> : ""}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default AnimeEpisodeCard

