import type { CustomizerConfig } from "./types";

const CONFIG_PREFIX = "ygdrassil:customizer:v1:";
const UNLOCK_PREFIX = "ygdrassil:customizer:unlocked:";

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function configStorageKey(slug: string): string {
  return `${CONFIG_PREFIX}${slug}`;
}

export function loadStoredConfig(slug: string): unknown | null {
  if (!hasWindow()) return null;

  try {
    const raw = window.localStorage.getItem(configStorageKey(slug));
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function saveStoredConfig(config: CustomizerConfig): boolean {
  if (!hasWindow()) return false;

  try {
    window.localStorage.setItem(
      configStorageKey(config.slug),
      JSON.stringify(config),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearStoredConfig(slug: string): void {
  if (!hasWindow()) return;

  try {
    window.localStorage.removeItem(configStorageKey(slug));
  } catch {
    // ignore storage errors
  }
}

export function isUnlocked(slug: string): boolean {
  if (!hasWindow()) return false;

  try {
    return window.sessionStorage.getItem(`${UNLOCK_PREFIX}${slug}`) === "1";
  } catch {
    return false;
  }
}

export function unlock(slug: string): void {
  if (!hasWindow()) return;

  try {
    window.sessionStorage.setItem(`${UNLOCK_PREFIX}${slug}`, "1");
  } catch {
    // ignore storage errors
  }
}

export function lock(slug: string): void {
  if (!hasWindow()) return;

  try {
    window.sessionStorage.removeItem(`${UNLOCK_PREFIX}${slug}`);
  } catch {
    // ignore storage errors
  }
}
