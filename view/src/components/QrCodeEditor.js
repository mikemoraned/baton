import React, { useState, Suspense } from "react";
import { schemeCategory10 } from "d3-scale-chromatic";
import { QrCode } from "./QrCode";

function buildColorPairs() {
  const schemeColors = schemeCategory10;
  return schemeColors
    .flatMap((color1) => {
      return schemeColors.map((color2) => {
        return [color1, color2];
      });
    })
    .filter(([color1, color2]) => color1 !== color2);
}

const colorPairs = buildColorPairs();

export function QrCodeEditor({
  initialBackgroundColor,
  initialForegroundColor,
}) {
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor
  );
  const [foregroundColor, setForegroundColor] = useState(
    initialForegroundColor
  );

  function chooseRandomPair() {
    const [color1, color2] = colorPairs[
      Math.floor(Math.random() * colorPairs.length)
    ];
    setBackgroundColor(color1);
    setForegroundColor(color2);
  }

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Qr Code (Click to randomise)</p>
      </header>
      <div className="card-image has-text-centered">
        <div className="box">
          <Suspense fallback={<div>loading</div>}>
            <QrCode
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              onClick={chooseRandomPair}
            />
          </Suspense>
        </div>
      </div>
      <div className="card-content">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th width="50%">Property</th>
              <th width="50%">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Background Color</td>
              <td>
                <span
                  style={{
                    backgroundColor: backgroundColor,
                    border: "1px solid black",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>{" "}
                {backgroundColor}
              </td>
            </tr>
            <tr>
              <td>Foreground Color</td>
              <td>
                <span
                  style={{
                    backgroundColor: foregroundColor,
                    border: "1px solid black",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>{" "}
                {foregroundColor}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
