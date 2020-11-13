import React, { Suspense } from "react";
import { lazyLoader } from "../components/QrCode";

const QrCode = React.lazy(lazyLoader);

export function Home() {
  return (<div>
      <h2>Home</h2>
      <Suspense fallback={<div>loading</div>}>
        <QrCode />
      </Suspense>
 </div>);
}