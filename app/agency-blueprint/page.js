import SalesPageClient from "./SalesPageClient";
import "./agency-blueprint.css";

export const metadata = {
  title: "The Social Media Agency Blueprint — Start Earning $4,300/mo",
  description:
    "Start a profitable social media management agency without creating a single post. Scripts, templates, and the AI fulfillment secret. $27.",
  openGraph: {
    title: "The Social Media Agency Blueprint | The Well-Paid Expert",
    description:
      "Start a profitable social media management agency without creating a single post.",
  },
};

export default function AgencyBlueprintPage() {
  return <SalesPageClient />;
}
