import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react"
import CityPageClient from "./page.client"

interface CityData {
  name: string
  coordinates: [number, number]
  recommendationLevel: number
  fullSlug: string
  slug: string
  reco: string
  page: any
}

interface PlaceData {
  name: string
  coordinates: [number, number]
  recommendationLevel: number
}

function parseCity(data: any): CityData {
  const { name, coordinates, recommendationLevel, recommendation } = data.story.content
  const WHY = "Pourquoi venir ?"
  const WHERE = "Ou loger ?"
  const SEE = "QUE VOIR ?"
  const ADVICE = "CONSEIL ASTUCE ?"
  const HISTORY = "HISTOIRE ?"


  console.log(data?.story?.content)

  return {
    name: name ?? "Nom non disponible",
    coordinates: coordinates?.[0] ? [coordinates[0].lng, coordinates[0].lat] : [0, 0],
    recommendationLevel: recommendationLevel ?? "Non spécifié",
    fullSlug: data.story.full_slug,
    slug: data.story.slug,
    reco: recommendation ?? "Aucune recommandation disponible",
    page: [
      {
        title: data?.story?.content?.title[0].title ?? null,
        text: data?.story?.content?.title[0].text ?? null,
        withSeparator: data?.story?.content?.title[0].with_separator ?? null
      },
      {
        title: WHY,
        text: data?.story?.content?.why[0].text ?? null,
        withSeparator: data?.story?.content?.why[0].with_separator ?? null
      },
      {
        title: WHERE,
        text: data?.story?.content?.where[0].text ?? null,
        withSeparator: data?.story?.content?.where[0].with_separator ?? null
      },
      {
        title: SEE,
        text: data?.story?.content?.see[0].text ?? null,
        withSeparator: data?.story?.content?.see[0].with_separator ?? null
      },
      {
        title: ADVICE,
        text: data?.story?.content?.advice[0].text ?? null,
        withSeparator: data?.story?.content?.advice[0].with_separator ?? null
      },
      {
        title: HISTORY,
        text: data?.story?.content?.history[0].text ?? null,
        withSeparator: data?.story?.content?.history[0].with_separator ?? null
      },
    ]
  }
}

function parsePlace(data: any): PlaceData[] {
  return data?.rels?.map((place: any) => {
    const { name, coordinates, recommendationLevel } = place.content
    return {
      name: name ?? "Nom non disponible",
      coordinates: coordinates?.[0] ? [coordinates[0].lng, coordinates[0].lat] : [0, 0],
      recommendationLevel: recommendationLevel ?? "Non spécifié",
    }
  }) ?? []
}

export async function generateStaticParams() {
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

    return data.stories.map((story: any) => {
      return { slug: story.slug }
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
    return <div>Une erreur est survenue lors du chargement des villes.</div>
  }
}

export default async function CityPage({ params }: any) {
  const { slug } = await params

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || "ieyX2fb92PPcodmQMyvpkwtt",
    use: [apiPlugin],
  })

  const storyblokApi = getStoryblokApi()

  try {
    const { data } = await storyblokApi.get(`cdn/stories/cities/${slug}`, {
      version: "draft",
      resolve_relations: 'city.places',
    })

    if (!data) {
      throw new Error("Aucune donnée trouvée pour cette ville.")
    }

    return <CityPageClient data={{ ...parseCity(data), places: parsePlace(data) }} />
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
    return <div>Une erreur est survenue lors du chargement des données de la ville.</div>
  }
}