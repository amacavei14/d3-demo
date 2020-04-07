import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, line, scaleLinear, axisLeft, axisBottom } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 80]).range([150, 0]);

    const myLine = line<number>()
      .x((data, index): number => xScale(index))
      .y((data, index): number => yScale(data));

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    const xAxisElement = svg
      .select<SVGGElement>(".x-axis")
      .style("transform", "translateY(150px)");
    const yAxisElement = svg.select<SVGGElement>(".y-axis");

    xAxis(xAxisElement);
    yAxis(yAxisElement);
  }, [data]);
  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter
      </button>
    </>
  );
}

export default App;
