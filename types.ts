export type ResearchModule = 'PHYSICS' | 'COSMOLOGY' | 'BIOLOGY' | 'CONSCIOUSNESS' | 'ENERGY' | 'MATH' | 'QUANTUM' | 'S5_CIPHER' | 'CHAT' | 'CODEX';

export interface SimulationState {
  inputAmplitude: number; // A_input
  frequency: number; // Omega
  couplingConstant: number; // Alpha
  radius: number; // R
  qId: number; // Intentionality Level (1-10)
  retrocausalPull: number; // Future state pull (0-1)
  fpgaClock: number; // Refresh rate in ns (Target 341)
}

export interface PhysicsResult {
  waveNumber: number;
  resonanceQuality: number;
  energyDensity: number;
  effectiveMass: number;
  massReductionPercent: number;
  isLevitating: boolean;
  holographicEnergy: number; // EH = mc^3
  sawAcceleration: number; // SAW Propulsion
  harmonyMetric: number; // Global Harmony
  informationalFidelity: number; // Fidelity %
  chronoLatency: number; // ms
  metricStability: number; // 0-1
  allsparkSync: number; // %
}

export interface CosmologyState {
  distanceAU: number; // Distance from Sun
  velocity: number; // km/s
  dielectricConstant: number; // Object material property
  scaleFactor: number; // a(t)
}

export interface CosmologyResult {
  affinityDrift: number; // Non-gravitational acceleration
  newtonianGravity: number;
  totalAcceleration: number;
  isAntiTailVisible: boolean;
  jupiterResonance: number; // Proximity to Hill Sphere resonance
  h_qag: number; // QAG Hubble
  vacuumTension: number;
  recyclingCoefficient: number;
  retrocausalVelocity: number; // v(r) with future pull
}

export interface BiologyState {
  coherenceIndex: number; // C-value
  frequency: number; // 432Hz default
  deviceType: 'QVR_CRADLE' | 'URBAN_HUM' | 'SCALAR_IMPRINTER';
}

export interface BiologyResult {
  virusIntegrity: number; // %
  zetaPotential: number; // mV
  recoveryTimeDays: number;
  proteinFoldingState: number; // 0-1 (Relaxation)
}

export interface ConsciousnessState {
  observerFocus: number; // 0-100% (Gamma Synchrony)
  sampleMass: number; // kg (Test mass in torsion balance)
}

export interface ConsciousnessResult {
  psychonFlux: number; // Intensity of J_I
  massFluctuationMicrograms: number; // Delta M
  torque: number; // Newtons
  equivalenceViolation: boolean; // WEP Violation flag
}

export interface EnergyState {
  gridLoad: number; // MW
  couplingCoefficient: number; // k_e (Etheric Coupling)
  resonanceFrequency: number; // Target ~42.137 GHz or Tesla freq
}

export interface EnergyResult {
  impedance: number; // Ohms (Effective)
  transmissionLoss: number; // %
  isSuperconductive: boolean;
  cop: number; // Coefficient of Performance (Overunity check)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}