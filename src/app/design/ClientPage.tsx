'use client';

import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "../../plasmic-init";

export default function ClientPage({ prefetchedData }: { prefetchedData: any }) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={prefetchedData}>
      {/* 
        Leemos el componente que tiene nombre "Homepage" en tu proyecto de Plasmic 
      */}
      <PlasmicComponent component="Homepage" />
    </PlasmicRootProvider>
  );
}
