"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type EpisodeDetails, type AnimeDetails, getEpisode, getAnimeDetails, API_BASE_IMG_URL } from "@/lib/api"

export default function EpisodePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const season = params.season as string
  const episode = params.episode as string

  const [episodeData, setEpisodeData] = useState<EpisodeDetails | null>(null)
  const [animeData, setAnimeData] = useState<AnimeDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingEpisode, setLoadingEpisode] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [episodeError, setEpisodeError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ger-sub")
  const [videoSource, setVideoSource] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug || !season || !episode) return

      try {
        setLoading(true)
        setLoadingEpisode(true)

        getEpisode(slug, season, episode)
          .then((episodeResponse) => {
            setEpisodeData(episodeResponse.data)
            // Set default language based on availability
            if (episodeResponse.data.has_ger_sub) {
              setSelectedLanguage("ger-sub")
            } else if (episodeResponse.data.has_eng_sub) {
              setSelectedLanguage("eng-sub")
            } else if (episodeResponse.data.has_ger_dub) {
              setSelectedLanguage("ger-dub")
            }
            const ger_sub_link = episodeResponse.data.anime_episode_links.filter((l) => l.lang == "ger-sub").at(0)?.link
            const ger_dub_link = episodeResponse.data.anime_episode_links.filter((l) => l.lang == "ger-dub").at(0)?.link
            const eng_sub_link = episodeResponse.data.anime_episode_links.filter((l) => l.lang == "eng-sub").at(0)?.link
            if (ger_sub_link) {
              setVideoSource(ger_sub_link)
            } else if (ger_dub_link) {
              setVideoSource(ger_dub_link)
            } else if (eng_sub_link) {
              setVideoSource(eng_sub_link)
            }
          })
          .catch((error) => {
            setEpisodeError(error)
          })
          .finally(() => {
            setLoadingEpisode(false)
          })
        const [animeResponse] = await Promise.all([getAnimeDetails(slug)])

        setAnimeData(animeResponse.data)

        setLoading(false)
      } catch (err) {
        setError("Failed to load episode")
        setLoading(false)
      }
    }

    fetchData()
  }, [slug, season, episode])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !animeData) {
    return (
      <div className="crunchyroll-container py-12 text-center">
        <p className="text-muted-foreground">{error || "Episode not found"}</p>
      </div>
    )
  }

  // Find current episode index and determine prev/next episodes
  const currentSeason = animeData.anime_seasons.find((s) => s.season === season)
  const currentEpisodeIndex = currentSeason?.anime_episodes.findIndex((e) => e.episode === episode) ?? -1

  const prevEpisode = currentEpisodeIndex > 0 ? currentSeason?.anime_episodes[currentEpisodeIndex - 1] : null

  const nextEpisode =
    currentEpisodeIndex < (currentSeason?.anime_episodes.length ?? 0) - 1
      ? currentSeason?.anime_episodes[currentEpisodeIndex + 1]
      : null

  return (
    <div className="bg-background">
      <div className="crunchyroll-container py-6">
        <div className="mb-4">
          <Link href={`/anime/${slug}`} className="text-muted-foreground hover:text-primary flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to {animeData.title}
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {animeData.title} - Season {season}, Episode {episode}
        </h1>

        <div className="w-full bg-black rounded-md overflow-hidden mb-6">
          {videoSource ? (
            <div className="aspect-video">
              <iframe
                src={videoSource}
                className="w-full h-full"
                allowFullScreen
                title={`${animeData.title} S${season}E${episode}`}
              ></iframe>
            </div>
          ) : loadingEpisode ? (
            <div className="aspect-video flex items-center justify-center bg-muted">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Video source not available</p>
            </div>
          )}
        </div>

        {(() => {
          if (!episodeData) {
            return (
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex flex-col gap-4">
                  <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full max-w-md">
                    <TabsList className="bg-secondary/50 p-1 rounded-md">
                      <TabsTrigger
                        value="..."
                        disabled
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                      >
                        Loading...
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Tabs value={videoSource || ""} onValueChange={setVideoSource} className="w-full max-w-md">
                    <TabsList className="bg-secondary/50 p-1 rounded-md">
                      <TabsTrigger
                        value="..."
                        disabled
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                      >
                        Loading...
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-secondary/50 border-none hover:bg-secondary"
                  >
                    <ThumbsUp className="h-4 w-4" />0
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-secondary/50 border-none hover:bg-secondary"
                  >
                    <ThumbsDown className="h-4 w-4" />0
                  </Button>
                </div>
              </div>
            )
          }

          return (
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-col gap-4">
                <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full max-w-md">
                  <TabsList className="bg-secondary/50 p-1 rounded-md">
                    {episodeData.has_ger_sub && (
                      <TabsTrigger
                        value="ger-sub"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                      >
                        German Sub
                      </TabsTrigger>
                    )}
                    {episodeData.has_ger_dub && (
                      <TabsTrigger
                        value="ger-dub"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                      >
                        German Dub
                      </TabsTrigger>
                    )}
                    {episodeData.has_eng_sub && (
                      <TabsTrigger
                        value="eng-sub"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                      >
                        English Sub
                      </TabsTrigger>
                    )}
                  </TabsList>
                </Tabs>
                <Tabs value={videoSource || ""} onValueChange={setVideoSource} className="w-full max-w-md">
                  <TabsList className="bg-secondary/50 p-1 rounded-md">
                    {episodeData.anime_episode_links
                      .filter((l) => l.lang == selectedLanguage)
                      .map((link) => (
                        <TabsTrigger
                          key={link.id}
                          value={link.link}
                          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm"
                        >
                          {link.name}
                        </TabsTrigger>
                      ))}
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-secondary/50 border-none hover:bg-secondary"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {episodeData.like_count}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-secondary/50 border-none hover:bg-secondary"
                >
                  <ThumbsDown className="h-4 w-4" />
                  {episodeData.dislike_count}
                </Button>
              </div>
            </div>
          )
        })()}

        <div className="flex justify-between mb-8">
          {prevEpisode ? (
            <Button variant="outline" className="bg-secondary/50 border-none hover:bg-secondary" asChild>
              <Link href={`/anime/${slug}/${season}/${prevEpisode.episode}`}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Episode
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="bg-secondary/50 border-none hover:bg-secondary" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Episode
            </Button>
          )}

          {nextEpisode ? (
            <Button className="crunchyroll-button" asChild>
              <Link href={`/anime/${slug}/${season}/${nextEpisode.episode}`}>
                Next Episode <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button className="crunchyroll-button" disabled>
              Next Episode <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="crunchyroll-section-title">Episodes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentSeason?.anime_episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/anime/${slug}/${season}/${ep.episode}`}
                  className={`flex items-center p-3 rounded-md ${ep.episode === episode ? "bg-secondary/50 border-l-2 border-primary" : "bg-secondary/20 hover:bg-secondary/30"}`}
                >
                  <div className="w-20 h-12 rounded overflow-hidden mr-3 relative">
                    <Image
                      src={
                        ep.image
                          ? `${API_BASE_IMG_URL}/img/thumbs/${ep.image}`
                          : `${API_BASE_IMG_URL}/img/posters/small-${animeData.backdrop}.webp`
                      }
                      alt={`Episode ${ep.episode}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    {ep.episode !== episode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Episode {ep.episode}</p>
                    <p className="text-xs text-muted-foreground">{ep.view_count.toLocaleString()} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="crunchyroll-section-title">Seasons</h2>
            <div className="space-y-2">
              {animeData.anime_seasons.map((s) => (
                <Link
                  key={s.id}
                  href={`/anime/${slug}/${s.season}/1`}
                  className={`block p-3 rounded-md ${s.season === season ? "bg-secondary/50 border-l-2 border-primary" : "bg-secondary/20 hover:bg-secondary/30"}`}
                >
                  Season {s.season} ({s.anime_episodes.length} episodes)
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

