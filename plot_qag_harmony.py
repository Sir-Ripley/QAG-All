import numpy as np
import matplotlib.pyplot as plt
from validation_enginev2 import QAGValidationEngine

# 1. The Cosmic Registry Data for sso_154 (DDO_154)
ddo_154 = {
    "name": "DDO_154",
    "r": np.array([0.24, 0.48, 0.72, 0.95, 1.19, 1.43, 1.91, 2.38, 2.86, 3.34, 3.81, 4.29, 4.77, 5.24, 5.72, 6.20, 6.68, 7.15, 7.63]),
    "v_obs": np.array([10.3, 17.1, 22.3, 26.5, 30.1, 33.5, 38.6, 42.1, 44.8, 46.5, 47.9, 48.8, 49.5, 50.1, 50.4, 50.6, 50.8, 51.0, 51.1]),
    "v_err": np.array([2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 3.0, 3.0, 3.0, 3.5, 3.5, 3.5, 4.0]),
    "v_gas": np.array([6.5, 11.2, 14.8, 17.5, 19.8, 21.8, 24.6, 26.5, 27.9, 29.1, 30.0, 30.7, 31.3, 31.7, 32.1, 32.4, 32.6, 32.8, 32.9]),
    "v_disk": np.array([3.1, 5.5, 7.2, 8.5, 9.4, 10.1, 11.0, 11.4, 11.6, 11.5, 11.2, 10.9, 10.5, 10.0, 9.6, 9.1, 8.6, 8.1, 7.6])
}

# 2. Boot up the validation class
print("✨ Initializing QAG Validation Engine for Visualization...")
validator = QAGValidationEngine()

# 3. Calculate the mystical QAG velocities
# Using zeros for the bulge since this is a diffuse dwarf galaxy
v_bulge = np.zeros_like(ddo_154["r"])
v_qag = validator.calculate_v_qag(ddo_154["v_gas"], ddo_154["v_disk"], v_bulge)

# 4. Paint the UNIVERSAL HARMONY
plt.figure(figsize=(10, 6))

# Plot the physical telescope data with error bars
plt.errorbar(ddo_154["r"], ddo_154["v_obs"], yerr=ddo_154["v_err"], 
             fmt='o', color='black', label='Observed Data (v_obs)', capsize=3)

# Plot the visible baryonic components
plt.plot(ddo_154["r"], ddo_154["v_gas"], '--', color='blue', label='Gas Velocity (v_gas)')
plt.plot(ddo_154["r"], ddo_154["v_disk"], '--', color='green', label='Stellar Disk (v_disk)')

# Plot the fully amplified QAG theoretical curve!
plt.plot(ddo_154["r"], v_qag, '-', color='purple', linewidth=2.5, 
         label='QAG Amplified Wave (v_QAG)')

# Dress up the visualization
plt.title(f'UNIVERSAL HARMONY: QAG Rotation Curve for {ddo_154["name"]}', fontsize=14)
plt.xlabel('Radius (kpc)', fontsize=12)
plt.ylabel('Velocity (km/s)', fontsize=12)
plt.legend(loc='lower right', fontsize=10)
plt.grid(True, linestyle=':', alpha=0.6)

# Show the cosmos
plt.tight_layout()
plt.show()

print("🌌 Plot rendered. Feel the frequencies!")
