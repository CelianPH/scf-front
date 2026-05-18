"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const DISTRIBUTION_COORDS = {
  longitude: 4.8497,
  latitude: 45.7593,
};

export default function DistributionMap() {
  const [scrollZoom, setScrollZoom] = useState(false);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${DISTRIBUTION_COORDS.latitude},${DISTRIBUTION_COORDS.longitude}`;

  return (
    <div className="relative h-full w-full">
      <Map
        initialViewState={{
          longitude: DISTRIBUTION_COORDS.longitude,
          latitude: DISTRIBUTION_COORDS.latitude,
          zoom: 15.5,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
        scrollZoom={scrollZoom}
        attributionControl={false}
        onClick={() => setScrollZoom(true)}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker
          longitude={DISTRIBUTION_COORDS.longitude}
          latitude={DISTRIBUTION_COORDS.latitude}
          anchor="bottom"
        >
          <DistributionPin />
        </Marker>
      </Map>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-text shadow-md ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white hover:shadow-lg"
      >
        Itinéraire
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}

function DistributionPin() {
  return (
    <div className="relative -translate-y-1 cursor-pointer">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1 h-2 w-6 rounded-full bg-black/30 blur-sm"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30"
      />
      <svg
        width="36"
        height="44"
        viewBox="0 0 36 44"
        className="relative drop-shadow-lg"
        aria-label="Lieu de distribution"
      >
        <path
          d="M18 0C8.06 0 0 8.06 0 18c0 11.5 14.5 23 17 25.5a1.5 1.5 0 0 0 2 0C21.5 41 36 29.5 36 18 36 8.06 27.94 0 18 0Z"
          fill="var(--color-primary, #C2185B)"
        />
        <circle cx="18" cy="18" r="6.5" fill="white" />
      </svg>
    </div>
  );
}
