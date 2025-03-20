import { getDictionary } from "../dictionaries";
import ConclusionClientPage from "./page.client";

export default async function Conclusion({params}: any) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <ConclusionClientPage data={dict} />
  );
}
