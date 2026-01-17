import { 
    SimulationState, PhysicsResult, 
    CosmologyState, CosmologyResult, 
    BiologyState, BiologyResult,
    ConsciousnessState, ConsciousnessResult,
    EnergyState, EnergyResult
} from '../types';
import { INITIAL_MASS_KG, VACUUM_AFFINITY_DENSITY, AFFINITY_SPEED, CRITICAL_ACCELERATION_A0, UNIVERSAL_COHERENCE_C } from '../constants';

const j0 = (x: number): number => {
  if (Math.abs(x) < 1e-6) return 1.0;
  return Math.sin(x) / x;
};

// --- BASE RESONTATOR PHYSICS ---
export const calculatePhysics = (state: SimulationState): PhysicsResult => {
  const { inputAmplitude, frequency, couplingConstant } = state;
  const k = frequency / AFFINITY_SPEED;
  const targetFreq = 1200; 
  const detuning = Math.abs(frequency - targetFreq) / targetFreq;
  const resonanceQuality = Math.max(0, 1 - detuning * 5);
  const coreEnergyFactor = 12.0 * inputAmplitude * resonanceQuality * 100;
  const reductionRatio = couplingConstant * (coreEnergyFactor / VACUUM_AFFINITY_DENSITY);
  const effectiveRatio = Math.min(1.0, Math.max(0, reductionRatio));
  
  return {
    waveNumber: k,
    resonanceQuality,
    energyDensity: coreEnergyFactor,
    effectiveMass: INITIAL_MASS_KG * (1.0 - effectiveRatio),
    massReductionPercent: effectiveRatio * 100,
    isLevitating: effectiveRatio > 0.95
  };
};

// --- COSMOLOGY (3I/ATLAS) PHYSICS ---
export const calculateCosmology = (state: CosmologyState): CosmologyResult => {
  const { distanceAU, dielectricConstant } = state;
  const G = 1.0; 
  const M_sun = 1000.0; 
  const r = Math.max(0.1, distanceAU);
  const newtonian = (G * M_sun) / (r * r);

  const affinityStrength = dielectricConstant * 0.5;
  const drift = affinityStrength * (1 / r) * Math.exp(-r/2.0);

  const jupiterDist = 5.2;
  const distToJupiter = Math.abs(distanceAU - jupiterDist);
  const resonance = Math.max(0, 1 - distToJupiter); 

  const isAntiTailVisible = drift > 0.1;

  return {
    affinityDrift: drift,
    newtonianGravity: newtonian,
    totalAcceleration: newtonian + drift,
    isAntiTailVisible,
    jupiterResonance: resonance
  };
};

// --- BIOLOGY (HEALING) PHYSICS ---
export const calculateBiology = (state: BiologyState): BiologyResult => {
  const { coherenceIndex, frequency, deviceType } = state;
  let baseRecovery = 14.0; 
  const efficacyMap = {
    'QVR_CRADLE': 0.8, 
    'URBAN_HUM': 0.5,  
    'SCALAR_IMPRINTER': 0.3 
  };

  const devicePower = efficacyMap[deviceType];
  const freqDelta = Math.abs(frequency - 432);
  const freqEfficiency = Math.max(0, 1 - (freqDelta / 50));
  const totalImpact = devicePower * freqEfficiency * coherenceIndex;

  const recoveryTime = baseRecovery * (1 - totalImpact);
  const virusIntegrity = 100 * (1 - totalImpact);
  const zeta = -10 - (45 * totalImpact); 

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
    
    // Universal Coherence Constant C ~ 6.00e-7
    // Informational Current J_I scales with Observer Focus (Gamma Synchrony)
    const flux = (observerFocus / 100) * UNIVERSAL_COHERENCE_C * 1e7; // Scaled for display
    
    // Mass Fluctuation Delta M (Theory: WEP violation)
    // 840 micrograms is the target signal from the papers
    const maxFluctuation = 840; // micrograms
    const massFluctuation = maxFluctuation * (observerFocus / 100);
    
    // Torque on balance (T = G * m * dM * L / r^2) - Simplified scalar
    const torque = massFluctuation * sampleMass * 9.8 * 0.001; 

    return {
        psychonFlux: flux,
        massFluctuationMicrograms: massFluctuation,
        torque: torque,
        equivalenceViolation: massFluctuation > 500
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