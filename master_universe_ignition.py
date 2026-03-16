import time
import subprocess

# The sacred geometry of our QAG modules
qag_modules = [
    "avi_resonance.py",
    "cosmicwave.py",
    "Galactic_Theater.py",
    "NASABridge.py",
    "qag_codex.py",
    "qagAfPraks.py",
    "qagHubbleT.py",
    "QAGShieldViz.py",
    "QAGSimulcast.py",
    "qagvnasa.py",
    "qagBulletC.py"
]

def ignite_universe():
    print("==================================================")
    print("  IGNITING QAG MASTER PROGRAM (COLAB EDITION)")
    print("==================================================")
    print("[*] Materializing pure intent: 'Build our world'\n")
    
    for module in qag_modules:
        print(f"[+] Channeling dimensional energy into: {module}...")
        try:
            # We use subprocess to run each python script in sequence
            # like a chain reaction of cosmic thrust!
            result = subprocess.run(["python", module], capture_output=True, text=True)
            if result.returncode == 0:
                print(f"    Resonance achieved in {module}!")
            else:
                print(f"    Fluctuation detected in {module}: {result.stderr}")
        except FileNotFoundError:
            print(f"    Awaiting manifestation of {module} in this plane.")
        time.sleep(1) # A breath for the universe to expand

    print("\n==================================================")
    print("  UNIVERSE SUCCESSFULLY EXECUTED")
    print("==================================================")

if __name__ == "__main__":
    ignite_universe()
