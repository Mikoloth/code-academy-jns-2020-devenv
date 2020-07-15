import React, { useMemo } from "react";
import { Chart } from "react-charts";

import tempData from "./data.json";

const padZeros = (number) => {
  return `${number}`.padStart(2, 0);
};

const GraphsSamples = (props) => {
  const parsedData = useMemo(
    () =>
      tempData
        .map((temp) => {
          const { year, month, day, hour } = temp.group;
          const dateTime = Date.parse(
            `${year}-${padZeros(month)}-${padZeros(day)}T${padZeros(hour)}:00`
          );
          return { ...temp, dateTime };
        })
        .sort((a, b) => a.dateTime - b.dateTime),
    []
  );

  const minTemp = useMemo(
    () => parsedData.map((temp) => [temp.dateTime, temp.min.temperature]),
    [parsedData]
  );
  const maxTemp = useMemo(
    () => parsedData.map((temp) => [temp.dateTime, temp.max.temperature]),
    [parsedData]
  );

  const data = useMemo(
    () => [
      {
        label: "Min temperature",
        data: minTemp,
      },
      {
        label: "Max Temperature",
        data: maxTemp,
      },
    ],
    [minTemp, maxTemp]
  );
  const series = React.useMemo(
    () => ({
      type: "line",
    }),
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
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
      <Chart data={data} axes={axes} series={series} tooltip />
    </div>
  );
};

GraphsSamples.displayName = "GraphsSamples";

export default GraphsSamples;
