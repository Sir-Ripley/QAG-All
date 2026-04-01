import { expect, test, describe } from "bun:test";
import { calculateEnergy } from "./physics";
import { EnergyState } from "../types";

describe("calculateEnergy", () => {
    test("baseline: no coupling and non-resonant frequency", () => {
        const state: EnergyState = {
            gridLoad: 100,
            couplingCoefficient: 0,
            resonanceFrequency: 10
        };
        const result = calculateEnergy(state);
        expect(result.impedance).toBe(100);
        expect(result.transmissionLoss).toBe(15);
        expect(result.cop).toBeCloseTo(0.75);
        expect(result.isSuperconductive).toBe(false);
    });

    test("partial coupling: reduces impedance and loss, improves COP", () => {
        const state: EnergyState = {
            gridLoad: 100,
            couplingCoefficient: 0.2,
            resonanceFrequency: 10
        };
        const result = calculateEnergy(state);
        expect(result.impedance).toBe(70);
        expect(result.transmissionLoss).toBe(10.5);
        expect(result.cop).toBeCloseTo(0.795);
        expect(result.isSuperconductive).toBe(false);
    });

    test("full coupling: achieves superconductivity and overunity COP", () => {
        const state: EnergyState = {
            gridLoad: 100,
            couplingCoefficient: 0.8,
            resonanceFrequency: 10
        };
        const result = calculateEnergy(state);
        expect(result.impedance).toBe(0);
        expect(result.transmissionLoss).toBe(0);
        expect(result.cop).toBeCloseTo(1.4);
        expect(result.isSuperconductive).toBe(true);
    });

    test("tesla resonance: reduces impedance via frequency tuning", () => {
        const state: EnergyState = {
            gridLoad: 100,
            couplingCoefficient: 0,
            resonanceFrequency: 42.137
        };
        const result = calculateEnergy(state);
        expect(result.impedance).toBeCloseTo(10);
        expect(result.transmissionLoss).toBeCloseTo(1.5);
        expect(result.cop).toBeCloseTo(0.885);
        expect(result.isSuperconductive).toBe(false);
    });

    test("resonance-induced superconductivity: frequency tuning pushes system over the edge", () => {
        const state: EnergyState = {
            gridLoad: 100,
            couplingCoefficient: 0.61,
            resonanceFrequency: 42.137
        };
        const result = calculateEnergy(state);
        expect(result.impedance).toBeCloseTo(0.85);
        expect(result.transmissionLoss).toBe(0);
        expect(result.cop).toBeCloseTo(1.305);
        expect(result.isSuperconductive).toBe(true);
    });
});
