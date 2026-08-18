/** where-to-land/lib/purchasingPower.ts
 *
 * This module provides functions to calculate the monthly cost of living and purchasing power for a given city and role.
 * It also provides a function to rank cities based on purchasing power for a specific role.
 */
import type { City, Role } from "./types";

/**
 * Calculates the monthly cost of living for a city
 * The monthly cost of living is the sum of all costs categories for a city
 * @param city - The city for which to calculate the monthly cost of living
 * @returns The monthly cost of living for the city
 */
export function monthlyCostOfLiving(city: City): number {
    const { rent, food, transport, utilities } = city.costs;
    const monthlyCost = rent + food + transport + utilities;
    return monthlyCost;
}

/**
 * Calculates the monthly purchasing power of a role in a specific city
 * Purchasing power is defined as the difference between the monthly salary and the monthly cost of living
 * @param city - The city for which to calculate the purchasing power
 * @param role - The role for which to calculate the purchasing power
 * @returns The monthly purchasing power of the role in the city
 */
export function purchasingPower(city: City, role: Role): number {
    const monthlySalary = role.salaryByCity[city.id] / 12;
    const monthlyCost = monthlyCostOfLiving(city);
    const monthlyPurchasingPower = monthlySalary - monthlyCost;
    return monthlyPurchasingPower;
}

/**
 * Ranks cities based on the purchasing power of a specific role
 * The cities are ordered from highest to lowest purchasing power
 * @param cities - An array of cities to rank
 * @param role - The role for which to rank the cities based on purchasing power
 * @returns An array of cities ordered by purchasing power, highest to lowest
 */
export function rankCities(cities: City[], role: Role): City[] {
    const rankedCities = [...cities].sort((a, b) => {
        const purchasingPowerA = purchasingPower(a, role);
        const purchasingPowerB = purchasingPower(b, role);
        return purchasingPowerB - purchasingPowerA; // Sort in descending order
    });
    return rankedCities;
}
