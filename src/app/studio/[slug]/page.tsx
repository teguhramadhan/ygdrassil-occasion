import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AccessGate from "@/components/customizer/AccessGate";
import { getAllInvitations, getInvitationBySlug } from "@/lib/invitations";

type StudioPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInvitations().map((invitation) => ({
    slug: invitation.slug,
  }));
}

export async function generateMetadata(
  props: StudioPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    return { title: "Studio — Undangan tidak ditemukan" };
  }

  return {
    title: `Studio — ${invitation.couple.bride.nickname} & ${invitation.couple.groom.nickname}`,
    description: "Editor kustomisasi undangan.",
  };
}

async function StudioContent({ params }: StudioPageProps) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  return <AccessGate invitation={invitation} />;
}

function StudioFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea] text-[#1b1a17]">
      <p className="text-sm opacity-60">Memuat studio editor...</p>
    </div>
  );
}

export default function StudioInvitationPage(props: StudioPageProps) {
  return (
    <Suspense fallback={<StudioFallback />}>
      <StudioContent params={props.params} />
    </Suspense>
  );
}
