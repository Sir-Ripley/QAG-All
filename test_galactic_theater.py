import math
import pytest
from Galactic_Theater import run_galactic_theater

def test_run_galactic_theater_default():
    """Test run_galactic_theater with default scale_factor=1.0"""
    results = run_galactic_theater()

    # Pre-calculated values for scale_factor=1.0
    # H_qag = 70.0 / 1.0 = 70.0
    # tension = sqrt(70.0 * 1.2e-10) = sqrt(8.4e-9) = 9.16515138991168e-05
    # r_qag = 1.0 / (1.0 + exp(-1.0)) = 0.7310585786300049

    assert results["H_qag"] == pytest.approx(70.0)
    assert results["tension"] == pytest.approx(9.16515138991168e-05)
    assert results["r_qag"] == pytest.approx(0.7310585786300049)
    assert results["r_qag"] > 0.5  # Should be coherent

def test_run_galactic_theater_half_scale():
    """Test run_galactic_theater with scale_factor=0.5"""
    results = run_galactic_theater(0.5)

    # Pre-calculated values for scale_factor=0.5
    # H_qag = 70.0 / 0.5 = 140.0
    # tension = sqrt(140.0 * 1.2e-10) = sqrt(1.68e-8) = 0.0001296148139681572
    # r_qag = 1.0 / (1.0 + exp(-0.5)) = 0.6224593312018546

    assert results["H_qag"] == pytest.approx(140.0)
    assert results["tension"] == pytest.approx(0.0001296148139681572)
    assert results["r_qag"] == pytest.approx(0.6224593312018546)
    assert results["r_qag"] > 0.5  # Should still be coherent

def test_run_galactic_theater_large_scale():
    """Test run_galactic_theater with scale_factor=2.0"""
    results = run_galactic_theater(2.0)

    # Pre-calculated values for scale_factor=2.0
    # H_qag = 70.0 / 2.0 = 35.0
    # tension = sqrt(35.0 * 1.2e-10) = sqrt(4.2e-9) = 6.48074069840786e-05
    # r_qag = 1.0 / (1.0 + exp(-2.0)) = 0.8807970779778823

    assert results["H_qag"] == pytest.approx(35.0)
    assert results["tension"] == pytest.approx(6.48074069840786e-05)
    assert results["r_qag"] == pytest.approx(0.8807970779778823)
    assert results["r_qag"] > 0.5  # Should still be coherent

def test_run_galactic_theater_negative_scale():
    """Test run_galactic_theater with negative scale_factor (edge case)"""
    results = run_galactic_theater(-1.0)

    # Pre-calculated values for scale_factor=-1.0
    # H_qag = 70.0 / -1.0 = -70.0
    # tension = sqrt(|-70.0 * 1.2e-10|) = sqrt(8.4e-9) = 9.16515138991168e-05
    # r_qag = 1.0 / (1.0 + exp(1.0)) = 0.2689414213699951

    assert results["H_qag"] == pytest.approx(-70.0)
    assert results["tension"] == pytest.approx(9.16515138991168e-05)
    assert results["r_qag"] == pytest.approx(0.2689414213699951)
    assert results["r_qag"] < 0.5  # Should NOT be coherent for scale_factor = -1.0
