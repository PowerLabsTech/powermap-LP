
"use client";

import dynamic from "next/dynamic";
import type { MapViewProps } from "./MapView";

const MapView = dynamic<MapViewProps>(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e7eee4",
        }}
      >
        Loading Google Maps...
      </div>
    ),
  }
);

export default function MapLoader(props: MapViewProps) {
  return <MapView {...props} />;
}
