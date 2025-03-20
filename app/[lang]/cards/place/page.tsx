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

function PlaceCard({ name, coordinates, recommendationLevel, fullSlug, onFlyTo, image, map, description }: any & { onFlyTo: (lng: number, lat: number) => void }) {
  return (
    <div className={css.PlaceCard} onClick={() => onFlyTo(coordinates[0], coordinates[1])}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          alt={name}
          src={image === "" ? "https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/main.jpg" : image}
          fill
          objectFit="cover"
        />
      </div>

      <div className={css.right}>
        <div className={css.edito}>
          <h2>{name}</h2>
          <Notation number={recommendationLevel} left />
          <span />
          <p>{description}</p>
        </div>

        <div className={css.info}>
          {/* <div>
            Prix : Gratuit
          </div> */}
          {map !== "#" && (
            <div>
              <a href={map} target="_blank">
                Lien Google Maps
              </a>
            </div>
          )}
          {/* <div>
            type Sanctuaire
          </div> */}
        </div>
      </div>


    </div>
  );
};

export default React.memo(PlaceCard);