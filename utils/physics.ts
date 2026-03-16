import { 
    SimulationState, PhysicsResult, 
    CosmologyState, CosmologyResult, 
    BiologyState, BiologyResult,
    ConsciousnessState, ConsciousnessResult,
    EnergyState, EnergyResult
} from '../types';
import { 
    INITIAL_MASS_KG, VACUUM_AFFINITY_DENSITY, AFFINITY_SPEED, 
    CRITICAL_ACCELERATION_A0, UNIVERSAL_COHERENCE_C,
    SYMMETRY_SCALING_FACTOR_PHI, RESONANT_FREQUENCY_MHZ,
    PSYCHON_MASS_FLUCTUATION_UG, INFORMATIONAL_FIDELITY_GAMMA,
    GLOBAL_HARMONY_TARGET, HUBBLE_CONSTANT_H0
} from '../constants';

const j0 = (x: number): number => {
  if (Math.abs(x) < 1e-6) return 1.0;
  return Math.sin(x) / x;
};

// --- BASE RESONATOR PHYSICS ---
export const calculatePhysics = (state: SimulationState): PhysicsResult => {
  const { inputAmplitude, frequency, couplingConstant, qId } = state;
  const k = frequency / AFFINITY_SPEED;
  
  // Resonance peak at 0.70 MHz (scaled to 700 Hz for the sim)
  const targetFreq = 700; 
  const detuning = Math.abs(frequency - targetFreq) / targetFreq;
  const resonanceQuality = Math.max(0, 1 - detuning * 5);
  
  // EH = mc^3 (Holographic Overdrive)
  const c = 299792458;
  const holographicEnergy = INITIAL_MASS_KG * Math.pow(c, 3) * SYMMETRY_SCALING_FACTOR_PHI;

  const coreEnergyFactor = 12.0 * inputAmplitude * resonanceQuality * 100;
  const reductionRatio = couplingConstant * (coreEnergyFactor / VACUUM_AFFINITY_DENSITY);
  const effectiveRatio = Math.min(1.0, Math.max(0, reductionRatio));

  // SAW Acceleration: a = (1/M) * (0.5 * rho * omega^2 * A^2 * eta)
  // Simplified for simulation:
  const omega = 2 * Math.PI * frequency;
  const sawAcc = (1 / INITIAL_MASS_KG) * (0.5 * 1.0 * Math.pow(omega, 2) * Math.pow(inputAmplitude, 2) * 0.98) * (qId / 10);
  
  // New Metrics
  const harmony = GLOBAL_HARMONY_TARGET + (Math.random() * 0.01 - 0.005) * (1 - resonanceQuality);
  const fidelity = INFORMATIONAL_FIDELITY_GAMMA * 100 * resonanceQuality;

  return {
    waveNumber: k,
    resonanceQuality,
    energyDensity: coreEnergyFactor,
    effectiveMass: INITIAL_MASS_KG * (1.0 - effectiveRatio),
    massReductionPercent: effectiveRatio * 100,
    isLevitating: effectiveRatio > 0.95,
    holographicEnergy,
    sawAcceleration: sawAcc,
    harmonyMetric: harmony,
    informationalFidelity: fidelity
  };
};

// --- COSMOLOGY (AVI LAW) PHYSICS ---
export const calculateCosmology = (state: CosmologyState): CosmologyResult => {
  const { distanceAU, velocity, dielectricConstant, scaleFactor } = state;
  const G = 6.67430e-11; 
  const M_sun = 1.989e30; 
  const r = Math.max(0.1, distanceAU) * 1.496e11; // Convert to meters
  
  // Newtonian Gravity
  const newtonian = (G * M_sun) / (r * r);

  // AVI Law: gobs = gB + B_AVI
  // For g_bar << a0, v = (GM a0)^1/4
  const a0 = CRITICAL_ACCELERATION_A0;
  const g_bar = newtonian;
  
  let totalAcc = newtonian;
  if (g_bar < a0) {
      // Resonant regime
      totalAcc = Math.pow(g_bar * a0, 0.5); // Simplified interpolation
  }

  const drift = totalAcc - newtonian;
  const resonance = Math.max(0, 1 - Math.abs(distanceAU - 5.2)); 

  // Galactic Theater Logic
  const h_qag = HUBBLE_CONSTANT_H0 * (1.0 / scaleFactor);
  const tension = Math.sqrt(h_qag * a0 * 1e-7); // Scaled for display
  const r_qag = 1.0 / (1.0 + Math.exp(-scaleFactor));

  return {
    affinityDrift: drift,
    newtonianGravity: newtonian,
    totalAcceleration: totalAcc,
    isAntiTailVisible: drift > 1e-11,
    jupiterResonance: resonance,
    h_qag,
    vacuumTension: tension,
    recyclingCoefficient: r_qag
  };
};

// --- BIOLOGY (HEALING WAKE) PHYSICS ---
export const calculateBiology = (state: BiologyState): BiologyResult => {
  const { coherenceIndex, frequency, deviceType } = state;
  let baseRecovery = 14.0; 
  const efficacyMap = {
    'QVR_CRADLE': 0.8, 
    'URBAN_HUM': 0.5,  
    'SCALAR_IMPRINTER': 0.3 
  };

  const devicePower = efficacyMap[deviceType];
  // Hubble-sync frequency 24.43 MHz
  const targetFreq = 24.43; 
  const freqDelta = Math.abs(frequency - targetFreq);
  const freqEfficiency = Math.max(0, 1 - (freqDelta / 10));
  const totalImpact = devicePower * freqEfficiency * coherenceIndex;

  const recoveryTime = baseRecovery * (1 - totalImpact);
  const virusIntegrity = 100 * (1 - totalImpact);
  const zeta = -10 - (45 * totalImpact); // Shifting toward -55mV

  return {
    virusIntegrity: Math.max(0, virusIntegrity),
    zetaPotential: zeta,
    recoveryTimeDays: Math.max(0.5, recoveryTime),
    proteinFoldingState: totalImpact 
  };
};

// --- CONSCIOUSNESS (PSYCHON) PHYSICS ---
export const calculateConsciousness = (state: ConsciousnessState): ConsciousnessResult => {
    const { observerFocus, sampleMass } = state;
    
    const flux = (observerFocus / 100) * UNIVERSAL_COHERENCE_C * 1e7;
    
    // Mass Fluctuation Delta M: 5,400 micrograms during Gamma synchrony
    const massFluctuation = PSYCHON_MASS_FLUCTUATION_UG * (observerFocus / 100);
    
    const torque = massFluctuation * sampleMass * 9.8 * 0.001; 

    return {
        psychonFlux: flux,
        massFluctuationMicrograms: massFluctuation,
        torque: torque,
        equivalenceViolation: massFluctuation > 1000
    };
};

// --- ENERGY (FERROELECTRIC GRID) PHYSICS ---
export const calculateEnergy = (state: EnergyState): EnergyResult => {
    const { gridLoad, couplingCoefficient, resonanceFrequency } = state;
    
    // Impedance Z = R + jwL + 1/jwC - k_e*A
    // We want k_e*A to cancel R.
    const baseResistance = 100; // Ohms
    const ethericNegativeResistance = couplingCoefficient * 150; // Tuned range
    
    let effectiveImpedance = Math.max(0, baseResistance - ethericNegativeResistance);
    
    // Frequency resonance bonus (Tesla Freq)
    const teslaFreq = 42.137; // GHz (scaled or concept)
    const tuning = Math.abs(resonanceFrequency - teslaFreq);
    if (tuning < 0.1) effectiveImpedance *= 0.1; // Deep resonance drop
    
    const isSuperconductive = effectiveImpedance < 1.0;
    
    // Transmission Loss scales with Impedance
    const loss = isSuperconductive ? 0 : (effectiveImpedance / baseResistance) * 15; // 15% max loss standard
    
    // COP (Coefficient of Performance)
    // If superconductive, we tap T_vac -> COP > 1
    const cop = isSuperconductive ? 1.0 + (couplingCoefficient * 0.5) : 0.9 - (loss/100);

    return {
        impedance: effectiveImpedance,
        transmissionLoss: loss,
        isSuperconductive,
        cop
    };
};