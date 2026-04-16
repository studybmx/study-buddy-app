import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "4cJVqQFsDgvUC3Zh84XsrV",  // El ID que copiaste
      token: "Oe8pShuaMTLYuXyydbPPnbAzI5bWSTsCkBIxqQe6BTUAXs4p3knUzKIExnQUuTsDbuEhZ7ppnkYro4OXWfw"  // El súper token que me mandaste
    }
  ],
  // Fetcher en caliente, muestra los cambios aunque no estén publicados oficialmente
  preview: true,
});
