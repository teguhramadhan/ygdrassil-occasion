import type { SectionId } from "@/lib/customizer/types";
import type { SectionComponentProps } from "./types";
import ClosingSection from "./sections/ClosingSection";
import CountdownSection from "./sections/CountdownSection";
import CoupleSection from "./sections/CoupleSection";
import DresscodeSection from "./sections/DresscodeSection";
import EnvelopeSection from "./sections/EnvelopeSection";
import EventsSection from "./sections/EventsSection";
import GallerySection from "./sections/GallerySection";
import GiftSection from "./sections/GiftSection";
import HeroSection from "./sections/HeroSection";
import QuoteSection from "./sections/QuoteSection";
import RsvpSection from "./sections/RsvpSection";
import StorySection from "./sections/StorySection";
import VenueSection from "./sections/VenueSection";
import VideoSection from "./sections/VideoSection";

type SectionRendererProps = SectionComponentProps & {
  id: SectionId;
  onOpen: () => void;
};

export default function SectionRenderer({
  id,
  onOpen,
  ...props
}: SectionRendererProps) {
  switch (id) {
    case "envelope":
      return <EnvelopeSection {...props} onOpen={onOpen} />;
    case "hero":
      return <HeroSection {...props} />;
    case "quote":
      return <QuoteSection {...props} />;
    case "couple":
      return <CoupleSection {...props} />;
    case "countdown":
      return <CountdownSection {...props} />;
    case "story":
      return <StorySection {...props} />;
    case "events":
      return <EventsSection {...props} />;
    case "venue":
      return <VenueSection {...props} />;
    case "gallery":
      return <GallerySection {...props} />;
    case "video":
      return <VideoSection {...props} />;
    case "dresscode":
      return <DresscodeSection {...props} />;
    case "gift":
      return <GiftSection {...props} />;
    case "rsvp":
      return <RsvpSection {...props} />;
    case "closing":
      return <ClosingSection {...props} />;
    default:
      return null;
  }
}
