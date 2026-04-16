import { PLASMIC } from "../../plasmic-init";
import ClientPage from "./ClientPage";

export default async function DesignPreviewPage() {
  // Con esto sacamos la información secreta de Plasmic "Homepage"
  const prefetchedData = await PLASMIC.fetchComponentData("Homepage");
  
  return <ClientPage prefetchedData={prefetchedData} />;
}
