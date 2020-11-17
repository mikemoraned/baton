import React from "react";
import { QrCodeEditor } from "../components/QrCodeEditor";
import summary from "../data/summary.json";

function groupByTotal(summary) {
  return summary.reduce((accum, next) => {
    const total = parseInt(next.total_count);
    if (accum.has(total)) {
      accum.set(total, accum.get(total).concat([next]));
    } else {
      accum.set(total, [next]);
    }
    return accum;
  }, new Map());
}

export function Successes() {
  const groupedByTotal = groupByTotal(summary);
  let largestFirstTotals = Array.from(groupedByTotal.keys()).sort(
    (a, b) => b - a
  );
  return (
    <section className="section">
      <h1 className="title">Successes</h1>
      <h2 className="subtitle">
        These are QR Codes that have been successfully scanned, grouped by
        number of times successfully scanned.
      </h2>
      <div>
        {largestFirstTotals.map((total) => {
          const entries = groupedByTotal.get(total);
          return (
            <div key={total}>
              <h2 className="title is-4 mt-5">Total: {total}</h2>
              {entries.map(({ name }) => {
                const [bg, fg] = name.split("-", 2);
                return (
                  <div key={`${bg}-${fg}`} className="mb-4">
                    <QrCodeEditor
                      initialBackgroundColor={bg}
                      initialForegroundColor={fg}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
