import GuideContent from "./GuideContent";
import "./guide.css";

export const metadata = {
  title: "The Social Media Agency Blueprint — Your Guide",
  description:
    "The complete playbook for starting your social media management agency. Scripts, templates, pricing, and the fulfillment secret.",
  robots: { index: false, follow: false },
};

export default function GuidePage() {
  return <GuideContent />;
}
