import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Calendar, Play, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { API_BASE_IMG_URL, getAnimeDetails } from "@/lib/api"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  try {
    const response = await getAnimeDetails(params.slug)
    const anime = response.data

    return {
      title: `${anime.title} - FireAnime`,
      description: anime.desc.substring(0, 160),
    }
  } catch (error) {
    return {
      title: "Anime - FireAnime",
      description: "View anime details and episodes",
    }
  }
}

export default async function AnimePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  let anime

  try {
    const response = await getAnimeDetails(params.slug)
    anime = response.data
  } catch (error) {
    notFound()
  }

  return (
    <div className="flex flex-col bg-background">
      <div
        className="w-full h-[500px] md:h-[600px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${API_BASE_IMG_URL}/img/posters/bg-${anime.backdrop}.webp)` }}
      >
        <div className="absolute inset-0 crunchyroll-gradient"></div>
        <div className="crunchyroll-container relative z-10 h-full flex items-end pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block w-[220px] h-[330px] rounded-md overflow-hidden shadow-lg relative">
              <Image
                src={anime.poster ? `${API_BASE_IMG_URL}/img/posters/small-${anime.poster}.webp` : "/placeholder.svg"}
                alt={anime.title}
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
            <div className="flex-1 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">{anime.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.generes.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-black/40 hover:bg-black/60 text-white border-none"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-4 text-white/80">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                  <span>{anime.vote_avg.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>
                    {anime.start}
                    {anime.end ? ` - ${anime.end}` : ""}
                  </span>
                </div>
              </div>
              <p className="text-white/70 mb-8 max-w-2xl line-clamp-3 md:line-clamp-none">{anime.desc}</p>
              {anime.anime_seasons.length > 0 && anime.anime_seasons[0].anime_episodes.length > 0 && (
                <div className="flex gap-4">
                  <Button className="crunchyroll-button flex items-center gap-2 px-6 py-3 text-base" asChild>
                    <Link href={`/anime/${anime.slug}/1/1`}>
                      <Play className="h-5 w-5" /> Watch Now
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 hover:bg-white/20 text-white flex items-center gap-2 px-6 py-3 text-base"
                  >
                    <Info className="h-5 w-5" /> Add to Watchlist
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="crunchyroll-container py-8">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="mb-6 bg-secondary/50 p-1 rounded-md">
            <TabsTrigger
              value="episodes"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
            >
              Episodes
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes" className="space-y-8">
            {anime.anime_seasons.map((season) => (
              <div key={season.id} className="space-y-4">
                <h3 className="crunchyroll-section-title">Season {season.season}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {season.anime_episodes.map((episode) => (
                    <Link
                      key={episode.id}
                      href={`/anime/${anime.slug}/${season.season}/${episode.episode}`}
                      className="group"
                    >
                      <div className="relative aspect-video rounded-md overflow-hidden">
                        <Image
                          src={
                            episode.image
                              ? `${API_BASE_IMG_URL}/img/thumbs/${episode.image}`
                              : `${API_BASE_IMG_URL}/img/posters/small-${anime.backdrop}.webp`
                          }
                          alt={`Episode ${episode.episode}`}
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
                          <Badge className="bg-black/70 hover:bg-black/70 text-xs">EP {episode.episode}</Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                          Episode {episode.episode}
                        </h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{episode.view_count.toLocaleString()} views</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="crunchyroll-section-title">Synopsis</h3>
                <p className="text-muted-foreground">{anime.desc}</p>
              </div>

              <div>
                <h3 className="crunchyroll-section-title">Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/30 p-4 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-white/70">Title</p>
                    <p className="text-white">{anime.title}</p>
                  </div>
                  {anime.alternate_titles && (
                    <div>
                      <p className="text-sm font-medium text-white/70">Alternative Titles</p>
                      <p className="text-white">{anime.alternate_titles}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white/70">Release Year</p>
                    <p className="text-white">{anime.start}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">Status</p>
                    <p className="text-white">{anime.end ? "Completed" : "Ongoing"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">Genres</p>
                    <p className="text-white">{anime.generes.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

