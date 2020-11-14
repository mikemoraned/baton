import React from "react";

export function lazyLoader() {
    console.time("loading baton libs");
    return Promise.all([
        import("@mike_moran/baton-lib"),
    ]).then(([baton_lib]) => {
        console.timeEnd("loading baton libs");
        return bindQrCode({
            baton_lib
        });
    });
}

function bindQrCode({ baton_lib }) {
    const { QrCodeGenerator } = baton_lib;

    function QrCode() {
        const generator = QrCodeGenerator.new(100, 100);
        const darkColor = "#add8e6";
        const lightColor = "#FFC0CB";
        const dataUri = generator.random_as_data_uri(darkColor, lightColor);
        console.dir(dataUri);
        return <img src={dataUri} alt="qr code" />;
    }

    return { default: QrCode };
}
