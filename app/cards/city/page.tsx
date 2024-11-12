'use client'

import css from "./page.module.scss"
import { useRouter } from 'next/navigation'
import React from "react"
import Image from "next/image"
import { Notation } from "../notation/page"

interface CityData {
  name: string
  coordinates: number[]
  recommendationLevel: number
  fullSlug: string
}

export const CityCard = React.memo(({ name, coordinates, recommendationLevel, fullSlug, onFlyTo }: CityData & { onFlyTo: (lng: number, lat: number) => void }) => {
  const router = useRouter();
  return (
    <div className={css.CityCard}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          alt={name}
          src="https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/main.jpg"
          fill
          objectFit="cover"
        />
      </div>
      <div className={css.title}>
        <h2>{name}</h2>
        <Notation number={recommendationLevel} />
      </div>

      <div className={css.actions}>
        <div className={css.viewMap} onClick={() => onFlyTo(coordinates[0], coordinates[1])}>
          Voir sur la carte
        </div>
        <div className={css.viewRecommendations} onClick={() => router.push(`/${fullSlug}`)}>
          Voir mes recommandations
        </div>
      </div>
    </div>
  );
});
