import { describe, test, expect } from "vitest";
import { formatCAD } from "../format";

describe("formatCAD", () => {
    test("formats a number as Canadian dollars", () => {
        expect(formatCAD(3500)).toBe("$3,500.00");
    });

    test("formats zero as Canadian dollars", () => {
        expect(formatCAD(0)).toBe("$0.00");
    });
});
