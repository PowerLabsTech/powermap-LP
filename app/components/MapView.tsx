
"use client";

import { useEffect, useRef } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

let googleMapsConfigured = false;

export type MapLocation = {
  lat: number;
  lng: number;
  name: string;
};

export type GoogleMapInstance = {
  panTo: (location: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
};

export type MapViewProps = {
  onMapReady?: (
    map: GoogleMapInstance,
    searchLocation: (location: MapLocation) => void
  ) => void;
};

export default function MapView({ onMapReady }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const mapContainer = mapContainerRef.current;

    async function initializeMap() {
      try {
        const apiKey =
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          console.error(
            "Google Maps API key is missing. Check .env.local."
          );
          return;
        }

        if (!googleMapsConfigured) {
          setOptions({
            key: apiKey,
            v: "weekly",
          });

          googleMapsConfigured = true;
        }

        const mapsLibrary = await importLibrary("maps");
        const GoogleMap = mapsLibrary.Map;

        if (cancelled || !mapContainer) {
          return;
        }

        const mapInstance = new GoogleMap(
          mapContainer,
          {
            center: {
              lat: 6.4281,
              lng: 3.4219,
            },
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
          }
        );

        onMapReady?.(mapInstance, (location) => {
          mapInstance.panTo({
            lat: location.lat,
            lng: location.lng,
          });

          mapInstance.setZoom(15);
        });
      } catch (error) {
        console.error("Google Maps failed to load:", error);
      }
    }

    void initializeMap();

    return () => {
      cancelled = true;
      mapContainer?.replaceChildren();
    };
  }, [onMapReady]);

  return (
    <div
      ref={mapContainerRef}
      className="powermap-google"
      aria-label="Interactive Google Map of Lagos, Nigeria"
    />
  );
}
