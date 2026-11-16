import type { Invitation } from "./invitation";
import { alyaRizky } from "@/data/invitations/alya-rizky";
import { dianaBima } from "@/data/invitations/diana-bima";
import { nadiaArif } from "@/data/invitations/nadia-arif";

const allInvitations: Invitation[] = [alyaRizky, dianaBima, nadiaArif];

export function getAllInvitations(): Invitation[] {
  return allInvitations.filter((invitation) => invitation.status === "published");
}

export function getInvitationBySlug(slug: string): Invitation | undefined {
  return allInvitations.find((invitation) => invitation.slug === slug);
}
