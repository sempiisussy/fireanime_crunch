import HeroSlider from "@/components/hero-slider"
import AnimeGrid from "@/components/anime-grid"
import AnimeEpisodeGrid from "@/components/anime-episode-grid"
import { getBest, getNewestEpisodes } from "@/lib/api"

export const metadata = {
  title: "FireAnime - Home",
  description: "Watch the latest anime episodes and explore new series.",
}

export default async function HomePage() {
  // Fetch data server-side
  const trendingResponse = await getBest(1)
  const newReleasesResponse = await getNewestEpisodes(1)

  const trendingAnime = trendingResponse.data.slice(0, 12)
  const newReleases = newReleasesResponse.data.slice(0, 10)

  return (
    <div className="flex flex-col bg-background">
      <HeroSlider />

      <div className="crunchyroll-container py-8">
        <div className="mb-10">
          <AnimeGrid animes={trendingAnime} title="Trending Now" showViewAll={true} viewAllLink="/trending" />
        </div>

        <div className="mb-10">
          <AnimeEpisodeGrid animes={newReleases} title="New Episodes" showViewAll={true} viewAllLink="/new-releases" />
        </div>

        {/* Simulate Crunchyroll's genre sections */}
        <div className="mb-10">
          <AnimeGrid
            animes={trendingAnime.filter((anime) => anime.generes.includes("Action")).slice(0, 6)}
            title="Action Anime"
            showViewAll={true}
            viewAllLink={`/genre/${btoa("Action").replaceAll("=", "")}`}
          />
        </div>

        <div className="mb-10">
          <AnimeGrid
            animes={trendingAnime
              .filter((anime) => anime.generes.includes("Fantasy") || anime.generes.includes("Adventure"))
              .slice(0, 6)}
            title="Fantasy & Adventure"
            showViewAll={true}
            viewAllLink={`/genre/${btoa("Fantasy").replaceAll("=", "")}`}
          />
        </div>
      </div>
    </div>
  )
}

