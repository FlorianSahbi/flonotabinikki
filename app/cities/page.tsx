import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react"
import CitiesPageClient from "./page.client"

interface StoryContent {
  name: string
  coordinates: { lng: number; lat: number }[]
  recommendationLevel: number
  image: any
}

interface Story {
  content: StoryContent
  full_slug: string
  slug: string
}

function parseCities(data: Story[]) {
  return data.map((story) => {
    const { name, coordinates, recommendationLevel, image } = story.content

    return {
      image: image?.filename ?? "https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/main.jpg",
      name: name ?? "Nom non disponible",
      coordinates: coordinates?.[0] ? [coordinates[0].lng, coordinates[0].lat] : [0, 0],
      recommendationLevel: recommendationLevel ?? "Non spécifié",
      fullSlug: story.full_slug,
      slug: story.slug,
    }
  })
}

export default async function CitiesPage() {
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || "ieyX2fb92PPcodmQMyvpkwtt",
    use: [apiPlugin],
  })

  const storyblokApi = getStoryblokApi()

  try {
    const { data } = await storyblokApi.get(`cdn/stories`, {
      version: "draft",
      starts_with: "cities/",
    })

    if (!data || !data.stories) {
      throw new Error("Aucune donnée trouvée")
    }

    return <CitiesPageClient data={parseCities(data.stories)} />
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
    return <div>Une erreur est survenue lors du chargement des villes.</div>
  }
}
