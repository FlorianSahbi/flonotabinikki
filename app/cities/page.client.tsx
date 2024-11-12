'use client'

import css from "./page.module.scss"
import MapComponent from "../map/page"
import { useRef, useCallback } from "react"
import React from "react"
import { CityCard } from "../cards/city/page"

interface CityData {
  name: string
  coordinates: number[]
  recommendationLevel: number
  fullSlug: string
}

interface CitiesPageClientProps {
  data: CityData[]
}

export default function CitiesPageClient({ data }: CitiesPageClientProps) {
  const mapRef = useRef<any>(null)

  const handleFlyTo = useCallback((lng: number, lat: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ lng, lat, zoom: 15, speed: 1.2, curve: 1 })
    }
  }, [])

  return (
    <div className={css.Cities}>
      <div className={css.wrapper}>
        <div className={css.left}>
          <div className={css.title}>
            <h2>Lieux que j'ai visités</h2>
            <p>Ici une liste des lieux que j'ai visités</p>
          </div>

          <div className={css.cards}>
            {data.map((city, index) => (
              <CityCard key={index} {...city} onFlyTo={handleFlyTo} />
            ))}
          </div>
        </div>
        <div className={css.right}>
          <MapComponent ref={mapRef} data={data} />
        </div>
      </div>
    </div>
  )
}
