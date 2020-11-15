import React from "react";
import { QrCodeEditor } from "../components/QrCodeEditor";
import { successes } from "../data/successes.json";

export function Successes() {
  return (
    <section className="section">
      <h1 class="title">Successes</h1>
      <h2 class="subtitle">
        These are QR Codes that at least one person has successfully scanned
      </h2>
      <div>
        {successes.map(({ bg, fg }) => {
          return (
            <div key={`${bg}-${fg}`}>
              <QrCodeEditor
                initialBackgroundColor={bg}
                initialForegroundColor={fg}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
