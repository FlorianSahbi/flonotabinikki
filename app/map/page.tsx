'use client';

import css from "./page.module.scss";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvcmlhbi1zYWhiaSIsImEiOiJjbTM0Zm53eWMxcjE1Mm5wc3JsOGYzdzJsIn0.8qCbPRzNGzjeDgT63PpO9Q';

interface MapComponentProps {
  data: any;
  zoom?: number;
  center?: [number, number];
}

const MapComponent = forwardRef<any, MapComponentProps>(
  ({ data, zoom = 3.77, center = [137.73141, 36.32583] }, ref) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!mapContainerRef.current) return;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center,
        zoom,
      });

      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }, [center, zoom]);

    useEffect(() => {
      if (!mapRef.current || !data) return;

      const markers = Array.isArray(data) ? data : [data, ...(data.places ?? [])];

      markers.forEach((item) => {
        new mapboxgl.Marker().setLngLat(item.coordinates).addTo(mapRef.current!);
      });
    }, [data]);

    useImperativeHandle(ref, () => ({
      flyTo: ({ lng, lat, zoom, speed, curve }: { lng: number, lat: number, zoom: number, speed: number, curve: number }) => {
        mapRef.current?.flyTo({ center: [lng, lat], zoom, speed, curve });
      },
    }));

    return <div ref={mapContainerRef} className={css.Map} />;
  }
);

export default function MapPage(props: any) {
  const mapRef = useRef<any>(null);
  return <MapComponent ref={mapRef} {...props} />;
}
