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
        QrCodeGenerator.new(10, 10);
        return <div>QrCode</div>
    }

    return { default: QrCode };
}
