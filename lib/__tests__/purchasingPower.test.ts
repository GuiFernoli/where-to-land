import { describe, test, expect } from "vitest";
import { monthlyCostOfLiving, purchasingPower, rankCities } from "../purchasingPower";
import type { City, Role } from "../types";

const toronto: City = {
    id: "toronto",
    name: "Toronto",
    province: "ON",
    costs: {
        rent: 2400,
        food: 600,
        transport: 156,
        utilities: 180,
    },
    costIndex: 100,
};

const halifax: City = {
    id: "halifax",
    name: "Halifax",
    province: "NS",
    costs: {
        rent: 1900,
        food: 550,
        transport: 82,
        utilities: 220,
    },
    costIndex: 85,
};

const montreal: City = {
    id: "montreal",
    name: "Montreal",
    province: "QC",
    costs: {
        rent: 1800,
        food: 550,
        transport: 120,
        utilities: 180,
    },
    costIndex: 90,
};

const frontendDeveloper: Role = {
    id: "frontend-developer",
    title: "Frontend Developer",
    salaryByCity: {
        toronto: 85000,
        vancouver: 90000,
        halifax: 75000,
        montreal: 80000,
    },
};

describe("monthlyCostOfLiving", () => {
    test("sums all monthly costs categories for a city", () => {
        expect(monthlyCostOfLiving(toronto)).toBe(2400 + 600 + 156 + 180); // 3336
        expect(monthlyCostOfLiving(halifax)).toBe(1900 + 550 + 82 + 220); // 2752
        expect(monthlyCostOfLiving(montreal)).toBe(1800 + 550 + 120 + 180); // 2650
    });
});

describe("purchasingPower", () => {
    test("subtracts the monthly cost from the monthly salary", () => {
        expect(purchasingPower(toronto, frontendDeveloper)).toBe(
            85000 / 12 - 3336, // (85000 / 12) = 7083.33 ... 7083.33 - 3336 = 3747.33
        );
        expect(purchasingPower(halifax, frontendDeveloper)).toBe(
            75000 / 12 - 2752, // (75000 / 12) = 6250 ... 6250 - 2752 =  3498
        );
        expect(purchasingPower(montreal, frontendDeveloper)).toBe(
            80000 / 12 - 2650, // (80000 / 12) = 6666.67 ... 6666.67 - 2650 = 4016.67
        );
    });
});

describe("rankCities", () => {
    test("orders cities by purchasing power, highest to lowest", () => {
        const cities = [toronto, halifax, montreal];
        const role = frontendDeveloper;
        const rankedCities = rankCities(cities, role);
        expect(rankedCities.map((city: City) => city.id)).toEqual([
            "montreal", // 4016.67
            "toronto", // 3747.33
            "halifax", // 3498
        ]);
    });

    test("does not mutate the input arrays", () => {
        const cities = [toronto, halifax, montreal];
        const role = frontendDeveloper;
        rankCities(cities, role);
        expect(cities.map((city: City) => city.id)).toEqual(["toronto", "halifax", "montreal"]);
    });
});
