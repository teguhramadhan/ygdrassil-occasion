import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackToTemplates from "@/components/shared/BackToTemplates";
import { getAllInvitations, getInvitationBySlug } from "@/lib/invitations";
import { themeComponents } from "@/lib/theme-components";

export function generateStaticParams() {
  return getAllInvitations().map((invitation) => ({
    slug: invitation.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    return { title: "Undangan tidak ditemukan" };
  }

  return {
    title: invitation.meta.title,
    description: invitation.meta.description,
  };
}

type InvitationContentProps = Pick<PageProps<"/[slug]">, "params">;

async function InvitationContent({ params }: InvitationContentProps) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  const Theme = themeComponents[invitation.themeId];

  if (!Theme) {
    notFound();
  }

  return <Theme invitation={invitation} />;
}

function InvitationFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f3ec] text-[#8a8375]">
      <p className="text-sm">Memuat undangan...</p>
    </div>
  );
}

export default function InvitationPage(props: PageProps<"/[slug]">) {
  return (
    <>
      <BackToTemplates />
      <Suspense fallback={<InvitationFallback />}>
        <InvitationContent params={props.params} />
      </Suspense>
    </>
  );
}
