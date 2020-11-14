import React, { useState } from "react";
import { schemeCategory10 } from "d3-scale-chromatic";

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

function buildColorPairs() {
    const schemeColors = schemeCategory10;
    return schemeColors.flatMap((color1) => {
        return schemeColors.map((color2) => {
            return [color1, color2];
        });
    }).filter(([color1, color2]) => color1 !== color2);
}

function bindQrCode({ baton_lib }) {
    const { QrCodeGenerator } = baton_lib;

    const colorPairs = buildColorPairs();
    
    function QrCode() {
        const [darkColor, setDarkColor] = useState("#000000");
        const [lightColor, setLightColor] = useState("#FFFFFF");
        function chooseRandomPair() {
            const [color1, color2] = colorPairs[Math.floor(Math.random() * colorPairs.length)];
            setDarkColor(color1);
            setLightColor(color2);
        }

        const generator = QrCodeGenerator.new(100, 100);

        const dataUri = generator.random_as_data_uri(darkColor, lightColor);
        console.dir(dataUri);
        return <img src={dataUri} alt="qr code" onClick={chooseRandomPair}/>;
    }

    return { default: QrCode };
}
