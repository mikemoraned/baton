import React from "react";
import { QrCodeEditor } from "../components/QrCodeEditor";

export function Home() {
  return (
    <div>
      <QrCodeEditor
        initialBackgroundColor={"#000000"}
        initialForegroundColor={"#FFFFFF"}
      />
    </div>
  );
}
