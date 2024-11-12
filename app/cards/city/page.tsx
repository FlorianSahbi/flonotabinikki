'use client'

import css from "./page.module.scss"
import { useRouter } from 'next/navigation'
import React from "react"
import Image from "next/image"
import Notation from "../notation/page"


interface CityData {
  name: string
  coordinates: number[]
  recommendationLevel: number
  fullSlug: string
}

function CityCard({ name, coordinates, recommendationLevel, fullSlug, image, onFlyTo }: any) {
  const router = useRouter();
  return (
    <div className={css.CityCard}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          alt={name}
          src={image}
          fill
          objectFit="cover"
        />
      </div>

      <div className={css.actions}>
        <div className={css.viewMap} onClick={() => onFlyTo(coordinates[0], coordinates[1])}>
          Position
        </div>

        <div className={css.title}>
          <h2>{name}</h2>
          <Notation number={recommendationLevel} fs />
        </div>

        <div className={css.viewRecommendations} onClick={() => router.push(`/${fullSlug}`)}>
          Découvrir
        </div>
      </div>
    </div>
  );
}

export default React.memo(CityCard);
