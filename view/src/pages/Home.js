import React, { Suspense } from "react";
import { lazyLoader } from "../components/QrCode";

const QrCode = React.lazy(lazyLoader);

export function Home() {
  return (<div>
      <Suspense fallback={<div>loading</div>}>
        <QrCode />
      </Suspense>
 </div>);
}