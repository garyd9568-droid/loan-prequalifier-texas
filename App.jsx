import React, { useState, useMemo } from 'react';

const LENDERS = [
  {
    name: "Republic Finance",
    url: "https://www.republicfinance.com/",
    type: "Installment",
    minLoan: 500,
    maxLoan: 50000,
    minCredit: 560,
    requiresSSN: true,
    statesAllowed: ["TX","AL","LA","KY","MS","NM","SC","TN","VA"],
    aprBand: "Medium",
    fundingSpeed: "Same day – 48h",
    notes: "Physical branches + online. Available in Texas."
  },
  {
    name: "Wise Loan",
    url: "https://wiseloan.com/",
    type: "Installment",
    minLoan: 200,
    maxLoan: 1500,
    minCredit: 500,
    requiresSSN: true,
    statesAllowed: ["TX"],
    aprBand: "Medium–High",
    fundingSpeed: "Same day – 48h",
    notes: "For new clients $200–$1,500. Works in Texas."
  },
  {
    name: "Credible (Marketplace)",
    url: "https://www.credible.com/",
    type: "Marketplace",
    minLoan: 600,
    maxLoan: 100000,
    minCredit: 560,
    requiresSSN: false,
    statesAllowed: "ALL",
    aprBand: "Low–Medium",
    fundingSpeed: "1–3 days",
    notes: "Soft pull pre‑qualification; multiple lenders."
  },
  {
    name: "LendingTree (Marketplace)",
    url: "https://www.lendingtree.com/",
    type: "Marketplace",
    minLoan: 500,
    maxLoan: 50000,
    minCredit: 560,
    requiresSSN: false,
    statesAllowed: "ALL",
    aprBand: "Low–Medium",
    fundingSpeed: "1–3 days",
    notes: "Large marketplace; many lenders. Works in Texas."
  }
];

export default function App() {
  const [amount, setAmount] = useState(1000);
  const [credit, setCredit] = useState(600);
  const [income, setIncome] = useState(1800);

  const results = useMemo(() => {
    return LENDERS.filter(l => {
      const amountOk = amount >= l.minLoan && amount <= l.maxLoan;
      if(!amountOk) return false;
      if(credit < l.minCredit) return false;
      if(l.statesAllowed !== "ALL" && !l.statesAllowed.includes("TX")) return false;
      return true;
    });
  }, [amount, credit, income]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Loan Pre‑Qualifier (Texas)</h1>
      </header>

      <main className="max-w-4xl mx-auto p-4 grid md:grid-cols-3 gap-6">
        <section className="bg-white p-4 rounded-xl shadow md:col-span-1">
          <h2 className="font-semibold mb-2">Your Info</h2>
          <div className="mb-3">
            <label className="block text-sm">Loan amount (USD)</label>
            <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="border rounded w-full p-2"/>
          </div>
          <div className="mb-3">
            <label className="block text-sm">Credit score (FICO)</label>
            <input type="number" value={credit} onChange={e=>setCredit(Number(e.target.value))} className="border rounded w-full p-2"/>
          </div>
          <div className="mb-3">
            <label className="block text-sm">Monthly income (USD)</label>
            <input type="number" value={income} onChange={e=>setIncome(Number(e.target.value))} className="border rounded w-full p-2"/>
          </div>
        </section>

        <section className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h2 className="font-semibold mb-2">Results</h2>
          {results.length === 0 && <p>No matches. Try adjusting your info.</p>}
          <ul className="space-y-3">
            {results.map((l, i) => (
              <li key={i} className="border p-3 rounded-xl hover:shadow">
                <a href={l.url} target="_blank" rel="noreferrer" className="text-lg font-semibold underline">{l.name}</a>
                <p className="text-sm text-gray-600">{l.type} • Range: ${l.minLoan}–${l.maxLoan} • APR: {l.aprBand}</p>
                <p className="text-sm mt-1">{l.notes}</p>
                <p className="text-xs text-gray-500 mt-1">Funding: {l.fundingSpeed}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
