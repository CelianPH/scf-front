"use client";

import dynamic from "next/dynamic";

const DistributionMap = dynamic(() => import("./DistributionMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gradient-to-br from-primary-50 to-secondary-50" />
  ),
});

export default function DistributionMapLoader() {
  return <DistributionMap />;
}
