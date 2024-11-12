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

function PlaceCard({ name, coordinates, recommendationLevel, fullSlug, onFlyTo }: any & { onFlyTo: (lng: number, lat: number) => void }) {
  const router = useRouter();
  return (
    <div className={css.PlaceCard} onClick={() => onFlyTo(coordinates[0], coordinates[1])}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          alt={name}
          src="https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/main.jpg"
          fill
          objectFit="cover"
        />
      </div>

      <div className={css.right}>
        <div className={css.edito}>
          <h2>{name}</h2>
          <Notation number={3} />
          <span />
          <p>Un des sacntuaire les plus connu du japon. y aller tres tot le mattin avant que les gens arrivent permettent de profiter de son ambiance bien particuliere. les gens ezn plus v ienne prier sur place tu peux les observer calmement, avant que les gfens arrive sur les coup de 11h</p>
        </div>

        <div className={css.info}>
          <div>
            Prix : Gratuit
          </div>
          <div>
            Google Map : OK
          </div>
          <div>
            type Sanctuaire
          </div>
        </div>
      </div>


    </div>
  );
};

export default React.memo(PlaceCard);