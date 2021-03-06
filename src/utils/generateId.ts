import crypto from "crypto";

/**
 * Generates a random id.
 *
 * @param length - The length of the generated id
 */
export function generateId(length: number) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
