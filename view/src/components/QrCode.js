import React from "react";
export function lazyLoader() {
    console.time("loading baton libs");
    return Promise.all([
        import("@mike_moran/baton-lib"),
        import("@mike_moran/baton-lib/baton_lib_bg"),
    ]).then(([baton_lib, baton_lib_bg]) => {
        console.timeEnd("loading baton libs");
        return bindQrCode({
            baton_lib,
            baton_lib_bg,
        });
    });
}

function bindQrCode({ baton_lib, baton_lib_bg }) {
    const { QrCodeGenerator } = baton_lib;
    const { memory } = baton_lib_bg;

    function QrCode() {
        const generator = QrCodeGenerator.new(10, 10);
        return <div>QrCode</div>
    }

    return { default: QrCode };
}
