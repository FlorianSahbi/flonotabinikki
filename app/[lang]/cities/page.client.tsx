'use client'

import css from "./page.module.scss"
import MapComponent from "../map/page"
import { useRef, useCallback } from "react"
import React from "react"
import CityCard from "@/app/[lang]/cards/city/page";
import Notation from "../cards/notation/page"

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
            <h2>Villes visitées</h2>
            <p>La liste des villes que j'ai eu la chance de visiter, bonnes comme mauvaises</p>
            <div style={{ marginTop: '.5em', display: "flex", flexDirection: "column", gap: ".5em",  border: "1px solid lightgrey", padding: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Notation number={1} left />
                <p>Si tu passes à côté, pourquoi pas</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Notation number={2} left />
                <p>Vaut le détour</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Notation number={3} left />
                <p>Peut justifier à lui seul de changer ton itinéraire pour l'inclure</p>
              </div>
            </div>
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
