import React, { useMemo } from "react";
import { Chart } from "react-charts";

import tempData from "./data.json";

const GraphsSamples = (props) => {
    const data = useMemo(
        () => [
            {
                label: "Series 1",
                data: [
                    [0, 1],
                    [1, 2],
                    [2, 4],
                    [3, 2],
                    [4, 7],
                ],
            },
            {
                label: "Series 2",
                data: [
                    [0, 3],
                    [1, 1],
                    [2, 5],
                    [3, 6],
                    [4, 4],
                ],
            },
        ],
        []
    );

    const axes = useMemo(
        () => [
            { primary: true, type: "linear", position: "bottom" },
            { type: "linear", position: "left" },
        ],
        []
    );

    return (
        <div
            style={{
                width: "400px",
                height: "300px",
            }}
        >
            <Chart data={data} axes={axes} tooltip />
        </div>
    );
};

GraphsSamples.displayName = "GraphsSamples";

export default GraphsSamples;