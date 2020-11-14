import React from "react";
import { QrCodeEditor } from "../components/QrCodeEditor";

export function Home() {
  return (
    <div>
      <QrCodeEditor
        initialDarkColor={"#000000"}
        initialLightColor={"#FFFFFF"}
      />
    </div>
  );
}
