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

        const generator = QrCodeGenerator.new(500, 500);

        const dataUri = generator.random_as_data_uri(darkColor, lightColor);
        console.dir(dataUri);
        return (<div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            Qr Code (Click to randomise)
                        </p>
                    </header>
                    <div className="card-image has-text-centered">
                        <div className="box">
                            <img src={dataUri} alt="qr code" onClick={chooseRandomPair}/>
                        </div>
                    </div>
                    <div className="card-content">
                        <table className="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th width="50%">Property</th>
                                    <th width="50%">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Background Color</td>
                                    <td><span style={{backgroundColor: lightColor, border: "1px solid black"}}>&nbsp;&nbsp;&nbsp;</span>{" "}{lightColor}</td>
                                </tr>
                                <tr>
                                    <td>Foreground Color</td>
                                    <td><span style={{backgroundColor: darkColor, border: "1px solid black"}}>&nbsp;&nbsp;&nbsp;</span>{" "}{darkColor}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>);
    }

    return { default: QrCode };
}
