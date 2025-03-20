'use client';

import MapComponent from "@/app/[lang]/map/page";
import css from "./page.module.scss";
import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { render } from 'storyblok-rich-text-react-renderer';
import Navigation from "@/app/[lang]/navigation/page";
import PlaceCard from "@/app/[lang]/cards/place/page";

interface GeoLabelProps {
  label: string;
  coordinates?: { lng: number; lat: number };
}

interface CityPageClientProps {
  data: {
    name: string;
    coordinates: [number, number];
    reco: any;
    page: any;
    places: Array<{
      name: string;
      coordinates: [number, number];
    }>;
  };
}

export default function CityPageClient({ data }: CityPageClientProps) {
  const mapRef = useRef<any>(null);
  const router = useRouter();

  const handleFlyTo = useCallback((lng: number, lat: number, zoom?: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ lng, lat, zoom: zoom ?? 17, speed: 1.2, curve: 1 });
    }
  }, []);

  function GeoLabel({ label, coordinates }: any) {
    return (
      <span onClick={coordinates ? () => handleFlyTo(coordinates[0].lng, coordinates[0].lat, 19) : undefined}>
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

  function Edito({ title, withSeparator, text }: { title: any, withSeparator: boolean, text: any }) {
    return (

      <div className={css.info}>
        <div className={css.edito}>
          <h2>{title}</h2>
          <RichText document={text} />
        </div>
      </div>
    )
  }

  function Title({ title, withSeparator, text }: { title: any, withSeparator: boolean, text: any }) {
    return (
      <div className={css.title}>
        <h1>{title}</h1>
        <span />
        <RichText document={text} />
      </div>
    )
  }

  return (
    <main className={css.City}>
      <div className={css.grid}>
        <div className={css.left}>
          <Navigation />

          <Title {...data.page[0]} />

          <div className={css.textContent}>
            {data.page.slice(1).map((e: any, index: number) => {

              return (
                !e.withSeparator ? <Edito key={index} {...e} /> : null
              )
            })}

            <div className={css.cards}>
              {data.places.map((place, index) => (
                <PlaceCard key={index} {...place} onFlyTo={handleFlyTo} />
              ))}
            </div>
          </div>
        </div>

        <div className={css.right}>
          <MapComponent ref={mapRef} data={data} center={data.coordinates} zoom={10} />
        </div>
      </div>
    </main>
  );
}
