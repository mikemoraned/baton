import React from "react";

function lazyLoader() {
  console.time("loading baton libs");
  return Promise.all([import("@mike_moran/baton-lib")]).then(([baton_lib]) => {
    console.timeEnd("loading baton libs");
    return bindQrCode({
      baton_lib,
    });
  });
}

function bindQrCode({ baton_lib }) {
  const { QrCodeGenerator } = baton_lib;

  function QrCode({ darkColor, lightColor, onClick }) {
    const generator = QrCodeGenerator.new(500, 500);

    const dataUri = generator.random_as_data_uri(darkColor, lightColor);
    console.dir(dataUri);
    return <img src={dataUri} alt="qr code" onClick={onClick} />;
  }

  return { default: QrCode };
}

export const QrCode = React.lazy(lazyLoader);
