/**
 * Verifies whether or not a valid magic link hash is available in the current page.
 *
 * @param hash - The hash of the current page.
 */
export function verifyMagicLinkHash(): boolean {
  if (typeof window === "undefined") return false;

  const hash = window.location.hash;

  if (!hash || hash === "#") return false;

  return hash.toLowerCase().includes("type=magiclink");
}
