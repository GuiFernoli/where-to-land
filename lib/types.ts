/**
 *
 * This module defines the types used in the purchasing power calculations, including the City and Role interfaces.
 * The City interface represents a city with its associated costs and cost index, while the Role interface represents a job role with its associated salary information by city.
 * These types are used to ensure that the city and role information is structured and accessible for accurate purchasing power calculations.
 */

/**
 * Represents a city with its associated costs and cost index
 */
export interface City {
    /** Unique identifier, used as key in Role.salaryByCity */
    id: string;
    name: string;
    /** Province in which the city is located */
    province: string;
    /** Monthly living costs in CAD */
    costs: {
        rent: number;
        food: number;
        transport: number;
        utilities: number;
    };
    /** Overall cost-of-living index for the city, where 100 is the baseline (average) cost of living */
    costIndex: number;
}

/**
 * Represents a job role with its associated salary information by city
 */
export interface Role {
    /** Unique identifier for the role */
    id: string;
    title: string;
    /** Annual salary information for the role, in CAD, keyed by city ID */
    salaryByCity: Record<string, number>;
}
