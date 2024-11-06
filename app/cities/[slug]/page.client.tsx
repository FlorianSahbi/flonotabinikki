'use client';

import MapComponent from "@/app/map/page";
import css from "./page.module.scss";
import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { render } from 'storyblok-rich-text-react-renderer';

interface GeoLabelProps {
  label: string;
  coordinates?: { lng: number; lat: number };
}

interface CityPageClientProps {
  data: {
    name: string;
    coordinates: [number, number];
    reco: any;
    places: Array<{
      name: string;
      coordinates: [number, number];
    }>;
  };
}

export default function CityPageClient({ data }: CityPageClientProps) {
  const mapRef = useRef<any>(null);
  const router = useRouter();

  const handleFlyTo = useCallback((lng: number, lat: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 15, speed: 1.2, curve: 1 });
    }
  }, []);

  function GeoLabel({ label, coordinates }: GeoLabelProps) {
    return (
      <span
        style={{ color: coordinates ? "blue" : "red" }}
        onClick={coordinates ? () => handleFlyTo(coordinates.lng, coordinates.lat) : undefined}
      >
        {label}
      </span>
    );
  }

  function RichText({ document }: { document: any }) {
    return (
      <div>
        {render(document, {
          blokResolvers: {
            geolabel: (props: any) => {
              const label = props.label as string;
              const coordinates = props.coordinates as { lng: number; lat: number } | undefined;

              return <GeoLabel label={label} coordinates={coordinates} />;
            },
          },
        })}
      </div>
    );
  }


  return (
    <main className={css.City}>
      <div className={css.grid}>
        <div className={css.left}>
          <div className={css.header}>
            <div className={css.backButton} onClick={() => router.push('/cities')}>
              Retour
            </div>
            <div className={css.navigationButtons}>
              <div>Precedent</div>
              <div>Suivant</div>
            </div>
          </div>
          <div className={css.textContent}>
            <h1>{data.name}</h1>
            <RichText document={data.reco} />

            <div className={css.section}>
              <h1>Que voir ?</h1>
            </div>

            <h1>Itineraire de visite recommandé?</h1>
            <p>faire si puis ça puis passer par la avant de faire ça</p>

            {data.places.map((place, index) => (
              <div
                key={index}
                className={css.placeCard}
                onClick={() => handleFlyTo(place.coordinates[0], place.coordinates[1])}
              >
                <h2>{place.name}</h2>
                <p>OOO</p>
                <p>Accessible en 15min</p>
                <p>Gratuit</p>
                <p>Site : okokokoko</p>
                <p>Grand temple bouddhiste avec le plus grand Bouddha allongé du monde et de nombreuses structures.</p>
              </div>
            ))}
          </div>
        </div>

        <div className={css.right}>
          <MapComponent ref={mapRef} data={data} center={data.coordinates} zoom={10} />
        </div>
      </div>
    </main>
  );
}
