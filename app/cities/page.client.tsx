'use client';

import css from "./page.module.scss";
import MapComponent from "../map/page";
import { useRef, useCallback } from "react";
import { useRouter } from 'next/navigation';
import React from "react";

interface CityData {
  name: string;
  coordinates: number[];
  recommendationLevel: number;
  fullSlug: string;
}

interface CitiesPageClientProps {
  data: CityData[];
}

const Notation = ({ number }: { number: number }) => {
  const getReview = (index: number) => {
    switch (index) {
      case 0: return "Pas transcendé";
      case 1: return "Si c'est sur la route, pourquoi pas ?";
      case 2: return "Vaut mieux ne pas passer à côté";
      case 3: return "Ça vaut l'effort !";
      default: return "";
    }
  };

  return (
    <div className={css.notation}>
      {Array.from({ length: number }, (_, index) => (
        <span key={index} className={css.notationDot} />
      ))}
    </div>
  );
};

const CityCard = React.memo(({ name, coordinates, recommendationLevel, fullSlug, onFlyTo }: CityData & { onFlyTo: (lng: number, lat: number) => void }) => {
  const router = useRouter();

  return (
    <div className={css.CityCard}>
      <h2>{name}</h2>
      <Notation number={recommendationLevel} />
      <div className={css.viewMap} onClick={() => onFlyTo(coordinates[0], coordinates[1])}>
        Voir sur la carte
      </div>
      <div className={css.viewRecommendations} onClick={() => router.push(`/${fullSlug}`)}>
        Voir mes recommandations
      </div>
    </div>
  );
});

export default function CitiesPageClient({ data }: CitiesPageClientProps) {
  const mapRef = useRef<any>(null);

  const handleFlyTo = useCallback((lng: number, lat: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo(lng, lat, 10);
    }
  }, []);

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
  );
}
