import { useState } from "react";

export default function App() {
  const [waterWeight, setWaterWeight] = useState("");
  const [fragrancePercent, setFragrancePercent] = useState(8);
  const [batchCount, setBatchCount] = useState(1);
  const [jarDiameter, setJarDiameter] = useState("3.0");
  const [wickType, setWickType] = useState("ECO");
  // Journal state (STEP 1)
  const [journalOpen, setJournalOpen] = useState(false);
  // Journal state (STEP 2)
  const [journalMode, setJournalMode] = useState("list"); // "list" | "new"
  const [waxType, setWaxType] = useState("");
  const [waxManufacturer, setWaxManufacturer] = useState("");
  const [meltPoint, setMeltPoint] = useState("");
  const [fragrancePercentUsed, setFragrance] = useState("");
  const [fragranceBrand, setFragranceBrand] = useState("");
  const [fragranceScent, setFragranceScent] = useState("");
  const [fragranceTempAdded, setFragranceTempAdded] = useState("");
  const [wickUsed, setWickUsed] = useState("");
  const [notes, setNotes] = useState("");
  const [journalEntries, setJournalEntries] = useState(() => {
  const saved = localStorage.getItem("journalEntries");
  return saved ? JSON.parse(saved) : [];
});

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
  const saveBatch = () => {
  const newEntry = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    waxType,
    waxManufacturer,
    meltPoint,
    fragrancePercentUsed,
    fragranceBrand,
    fragranceScent,
    fragranceTempAdded,
    wickUsed,
    notes,
  };

  const updated = [newEntry, ...journalEntries];
  setJournalEntries(updated);
  localStorage.setItem("journalEntries", JSON.stringify(updated));

  // reset form
  setWaxType("");
  setWaxManufacturer("");
  setMeltPoint("");
  setFragrancePercentUsed("");
  setFragranceBrand("");
  setFragranceScent("");
  setFragranceTempAdded("");
  setWickUsed("");
  setNotes("");

  setJournalMode("list");
};
  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "sans-serif",  fontSize: "18px", }}>
      <h2>🕯️ Candle Wax Calculator (Soy)</h2>

<div style={{ marginBottom: 12 }}>
  <label>Water Weight (grams)</label><br />
<input
  type="number"
  inputMode="decimal"
  step="0.1"
  value={waterWeight}
  onChange={e => setWaterWeight(e.target.value)}
  onFocus={e => e.target.select()}
  style={{
    textAlign: "center",
    fontSize: "18px",
    padding: "8px",
    width: "100%",
  }}
/>

</div>

<div style={{ marginBottom: 12 }}>
  <label>Fragrance Load (%)</label><br />
<input
  type="number"
  inputMode="decimal"
  step="0.1"
  value={fragrancePercent}
  onChange={e => setFragrancePercent(e.target.value)}
  onFocus={e => e.target.select()}
  style={{
    textAlign: "center",
    fontSize: "18px",
    padding: "8px",
    width: "100%",
  }}
/>

</div>

<div style={{ marginBottom: 12 }}>
  <label>Number of Candles</label><br />
<input
  type="number"
  inputMode="numeric"
  step="1"
  value={batchCount}
  onChange={e => setBatchCount(Number(e.target.value))}
  onFocus={e => e.target.select()}
  style={{
    textAlign: "center",
    fontSize: "18px",
    padding: "8px",
    width: "100%",
  }}
/>
</div>

<div style={{ marginBottom: 12 }}>
  <label>Jar Diameter (inches)</label><br />
<input
  type="number"
  inputMode="decimal"
  step="0.1"
  value={jarDiameter}
  onChange={e => setJarDiameter(e.target.value)}
  onFocus={e => e.target.select()}
  style={{
    textAlign: "center",
    fontSize: "18px",
    padding: "8px",
    width: "100%",
  }}
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
<button
  onClick={() => setJournalOpen(true)}
  style={{
    fontSize: "18px",
    padding: "12px 20px",
    marginTop: 20,
    width: "100%",
  }}
>
  📝 Journal
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
{journalOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "#fff",
      zIndex: 1000,
      padding: 20,
    }}
  >
<button onClick={() => setJournalOpen(false)}>
  ← Back
</button>

{journalMode === "list" && (
  <>
    <h2>📚 Batch History</h2>

    <button
      onClick={() => setJournalMode("new")}
      style={{
        fontSize: "18px",
        padding: "12px 20px",
        width: "100%",
        marginBottom: 20,
      }}
    >
      ➕ New Batch
    </button>

    <p>No batches yet.</p>
  </>
)}

{journalMode === "new" && (
  <>
    <h2>➕ New Batch</h2>
    <label>Wax Type Used</label>
<input
  value={waxType}
  onChange={e => setWaxType(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
/>
<label>Wax Manufacturer</label>
<input
  value={waxManufacturer}
  onChange={e => setWaxManufacturer(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
/>
<label>Melt Point Temperature</label>
<input
  type="number"
  inputMode="decimal"
  value={meltPoint}
  onChange={e => setMeltPoint(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  }}
/>
<label>Fragrance % Used</label>
<input
  type="number"
  inputMode="decimal"
  value={fragrancePercentUsed}
  onChange={e => setFragrancePercentUsed(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  }}
/>
<label>Fragrance Brand</label>
<input
  value={fragranceBrand}
  onChange={e => setFragranceBrand(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
/>

<label>Fragrance Scent</label>
<input
  value={fragranceScent}
  onChange={e => setFragranceScent(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
/>

<label>Temperature Fragrance Added</label>
<input
  type="number"
  inputMode="decimal"
  value={fragranceTempAdded}
  onChange={e => setFragranceTempAdded(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  }}
/>

<label>Wick Type Used</label>
<select
  value={wickUsed}
  onChange={e => setWickUsed(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
>
  <option value="">Select</option>
  <option>ECO</option>
  <option>CD</option>
  <option>HTP</option>
  <option>LX</option>
</select>

<label>Notes</label>
<textarea
  rows={6}
  value={notes}
  onChange={e => setNotes(e.target.value)}
  style={{
    fontSize: "18px",
    padding: "8px",
    width: "100%",
    marginBottom: 20,
  }}
/>
<button
  onClick={saveBatch}
  style={{
    fontSize: "18px",
    padding: "12px 20px",
    width: "100%",
  }}
>
  Save Batch
</button>

  </>
)}
  </div>
)}
    </div>
  );
}
