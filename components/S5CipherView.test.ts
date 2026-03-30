
import { expect, test, describe } from "bun:test";

function calculateEtotal(rResonance: number, nNodes: number) {
  if (rResonance === 1) return nNodes;
  return rResonance * (1 - Math.pow(rResonance, nNodes)) / (1 - rResonance);
}

describe("E_total calculation logic", () => {
  test("matches iterative calculation for r < 1", () => {
    const r = 0.8;
    const n = 12;
    let expected = 0;
    for (let i = 1; i <= n; i++) {
      expected += Math.pow(r, i);
    }
    const result = calculateEtotal(r, n);
    expect(result).toBeCloseTo(expected, 10);
  });

  test("handles r = 1", () => {
    const r = 1;
    const n = 12;
    const result = calculateEtotal(r, n);
    expect(result).toBe(12);
  });

  test("handles n = 1", () => {
    const r = 0.5;
    const n = 1;
    const result = calculateEtotal(r, n);
    expect(result).toBe(0.5);
  });
});
