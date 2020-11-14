import React from "react";
import { QrCodeEditor } from "../components/QrCodeEditor";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Specific() {
  const query = useQuery();
  console.dir(query);
  return (
    <div>
      <QrCodeEditor
        initialBackgroundColor={`#${query.get("bg")}`}
        initialForegroundColor={`#${query.get("fg")}`}
      />
    </div>
  );
}
