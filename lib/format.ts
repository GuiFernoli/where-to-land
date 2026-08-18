/**
 * This module provides a utility function to format amounts in Canadian dollars (CAD) using the Intl.NumberFormat API.
 * The formatCAD function takes a number as input and returns a string formatted as currency in CAD.
 */

/** Created once at module level — Intl.NumberFormat construction is expensive. */
const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
});

/**
 * Formats a given amount in Canadian dollars (CAD) using the Intl.NumberFormat API.
 * @param amount - The amount to be formatted in CAD.
 * @returns A string representing the formatted amount in CAD.
 */
export function formatCAD(amount: number): string {
    return formatter.format(amount);
}
