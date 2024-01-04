import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const containerRef = useRef();
  const svgRef = useRef();
  const [svgWidth, setSvgWidth] = useState(0);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    // Get the width of the container
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    setSvgWidth(containerWidth);

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Specify the chart’s dimensions.
    const height = 500;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;
    const adjustedWidth = svgWidth - marginLeft - marginRight;

    // Create the horizontal scale and its axis generator.
    const x = d3.scaleBand()
      .domain(data.map(d => d.letter))
      .range([marginLeft, adjustedWidth])
      .padding(0.1);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);

    // Create the vertical scale.
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.frequency)]).nice()
      .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, svgWidth, height]);

    // Append the bars.
    svg.append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.letter))
        .attr("y", d => y(d.frequency))
        .attr("height", d => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());

    // Append the axes.
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());

  }, [data, svgWidth]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default BarChart;
