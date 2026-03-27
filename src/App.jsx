import { useState } from "react";

export default function App() {
  const [waterWeight, setWaterWeight] = useState("");
  const [fragrancePercent, setFragrancePercent] = useState(8);
  const [batchCount, setBatchCount] = useState(1);
  const [jarDiameter, setJarDiameter] = useState("3.0");
  const [wickType, setWickType] = useState("ECO");

  const [result, setResult] = useState(null);

  const wickCharts = {
    ECO: [
      { min: 2.0, max: 2.4, wick: "ECO 4–6" },
      { min: 2.5, max: 2.9, wick: "ECO 6–8" },
      { min: 3.0, max: 3.4, wick: "ECO 8–10" },
      { min: 3.5, max: 3.9, wick: "ECO 10–12" },
      { min: 4.0, max: 4.5, wick: "ECO 12–14" }
    ],
    CD: [
      { min: 2.0, max: 2.4, wick: "CD 4–6" },
      { min: 2.5, max: 2.9, wick: "CD 6–8" },
      { min: 3.0, max: 3.4, wick: "CD 8–10" },
      { min: 3.5, max: 3.9, wick: "CD 10–12" },
      { min: 4.0, max: 4.5, wick: "CD 12–14" }
    ],
    HTP: [
      { min: 2.0, max: 2.4, wick: "HTP 72–83" },
      { min: 2.5, max: 2.9, wick: "HTP 93–104" },
      { min: 3.0, max: 3.4, wick: "HTP 104–121" },
      { min: 3.5, max: 3.9, wick: "HTP 121–131" },
      { min: 4.0, max: 4.5, wick: "HTP 131–140" }
    ],
    LX: [
      { min: 2.0, max: 2.4, wick: "LX 12–14" },
      { min: 2.5, max: 2.9, wick: "LX 14–18" },
      { min: 3.0, max: 3.4, wick: "LX 18–20" },
      { min: 3.5, max: 3.9, wick: "LX 20–24" },
      { min: 4.0, max: 4.5, wick: "LX 24–26" }
    ]
  };

  const calculate = () => {
    const water = parseFloat(waterWeight);
    const diameter = parseFloat(jarDiameter);
    if (!water || water <= 0) return;

    const singleWeight = water * 0.85;
    const totalWeight = singleWeight * batchCount;
    const fragrance = totalWeight * (fragrancePercent / 100);
    const wax = totalWeight - fragrance;

    const chart = wickCharts[wickType];
    const wick =
      chart.find(w => diameter >= w.min && diameter <= w.max)?.wick ||
      "Test required";

    setResult({
      total: Math.round(totalWeight * 2) / 2,
      wax: Math.round(wax * 2) / 2,
      fragrance: Math.round(fragrance * 2) / 2,
      wick
    });
  };

  const reset = () => {
    setWaterWeight("");
    setFragrancePercent(8);
    setBatchCount(1);
    setJarDiameter("3.0");
    setWickType("ECO");
    setResult(null);
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "sans-serif",  fontSize: "18px", }}>
      <h2>🕯️ Candle Wax Calculator (Soy)</h2>

<div style={{ marginBottom: 12 }}>
  <label>Water Weight (grams)</label><br />
  <input
    value={waterWeight}
    onChange={e => setWaterWeight(e.target.value)}
    style={{ textAlign: "center", fontSize: "18px", padding: "8px", width: "100%", }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>Fragrance Load (%)</label><br />
  <input
    value={fragrancePercent}
    onChange={e => setFragrancePercent(e.target.value)}
    style={{ textAlign: "center", fontSize: "18px", padding: "8px", width: "100%", }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>Number of Candles</label><br />
  <input
    value={batchCount}
    onChange={e => setBatchCount(Number(e.target.value))}
    style={{ textAlign: "center", fontSize: "18px", padding: "8px", width: "100%", }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>Jar Diameter (inches)</label><br />
  <input
    value={jarDiameter}
    onChange={e => setJarDiameter(e.target.value)}
    style={{ textAlign: "center", fontSize: "18px", padding: "8px", width: "100%", }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>Wick Type</label><br />
  <select
    value={wickType}
    onChange={e => setWickType(e.target.value)}
    style={{ textAlign: "center", fontSize: "18px", padding: "8px", width: "100%", }}
  >
    <option>ECO</option>
    <option>CD</option>
    <option>HTP</option>
    <option>LX</option>
  </select>
</div>

<div style={{ marginTop: 20 }}>
  <button
  onClick={calculate}
  style={{
    fontSize: "18px",
    padding: "12px 20px",
  }}
>
  Calculate
</button>
  <button
  onClick={reset}
  style={{
    fontSize: "18px",
    padding: "12px 20px",
    marginLeft: "10px",
  }}
>
  Reset
</button>
</div>

{result && (
  <div style={{ marginTop: 20 }}>
    <p><strong>Total Candle Weight:</strong> {result.total} g</p>
    <p><strong>Wax Needed:</strong> {result.wax} g</p>
    <p><strong>Fragrance Oil:</strong> {result.fragrance} g</p>
    <p><strong>Recommended Wick:</strong> {result.wick}</p>
  </div>

      )}
    </div>
  );
}

