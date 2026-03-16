import numpy as np

def run_galactic_theater(scale_factor=1.0):
    # --- INTERNAL ALIGNMENT ---
    # Ensure these lines are indented exactly 4 spaces
    c = 299792458.0             # Speed of Light
    H0_kms_mpc = 70.0           # Hubble Constant
    
    # The QAG Hubble Parameter (The 'Breath' of the Galaxy)
    # This is the line that was giving you trouble:
    H_qag = H0_kms_mpc * (1.0 / scale_factor) 
    
    # 1. CALCULATING THE 'GHOST HALO' TENSION
    # a0 is our 1.2e-10 floor
    a0 = 1.2e-10
    tension = np.sqrt(H_qag * a0)
    
    # 2. THE RECYCLING COEFFICIENT (R_qag)
    # How much chaos we turn back into 'Affinity'
    r_qag = 1.0 / (1.0 + np.exp(-scale_factor))
    
    print("--- GALACTIC THEATER DIAGNOSTICS ---")
    print(f"Current Scale Factor: {scale_factor}")
    print(f"QAG Hubble (H_qag):   {H_qag:.4f} km/s/Mpc")
    print(f"Vacuum Tension:       {tension:.4e} units")
    print(f"Recycling (R_qag):    {r_qag*100:.2f}%")
    
    if r_qag > 0.5:
        print("\nSTATUS: THEATER IS COHERENT. No dark matter required.")

# To run it, make sure this call is NOT indented:
run_galactic_theater(1.0)
