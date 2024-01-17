/* import { useEffect, useRef, useState } from 'react';
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
 */



import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNHLStandings } from '@/reduxFile/nhlSlice'
import Link from 'next/link';
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import BarChart from './BarChart';
import BarChart2 from './BarChart2';
import VerticalBarDown from './VerticalBarDown';



const Index = () => {

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const leading = useSelector(state => state.nhlStandings.data);
  const status = useSelector(state => state.nhlStandings.status);
  const error = useSelector(state => state.nhlStandings.error);


  
  useEffect(() => {
    if (year) {
      dispatch(fetchNHLStandings(year))
    }
  }, [year, dispatch]);

  
  if (status === 'failed') return <div>Error: {error}</div>;

  // teams selected by conference
  let east = []
  let west = []
  // all teams
  let nhl = []
 

  const conferenceWest = leading?.data?.conference['Západná konferencia'];
  const conferenceEast = leading?.data?.conference['Východná konferencia'];


  // east conference
  for (let key in conferenceEast) {
    if (conferenceEast.hasOwnProperty(key)) {
        const item = conferenceEast[key];
        east.push(item) 
        nhl.push(item)
    }
  }


  // west conference
  for (let key in conferenceWest) {
     if (conferenceWest.hasOwnProperty(key)) {
        const item = conferenceWest[key];
        west.push(item) 
        nhl.push(item)
    } 
  }




 function createTableRowsEastern(east) {

  return east.slice(8, 16).map((item, index) => (
    <tr key={index} className='border text-center'>
      <td>{index + 9}</td> 
      <td>
         <Link href={` /NHL/Team/${item?.shortname}`}
              className='fw-semibold'
              style={{textDecoration: 'none'}}>
         {item.shortname}
        </Link>
      </td>
      <td>{item.gp}</td>
      <td>{item.wins}</td>
      <td>{item.losts}</td>
      <td className='bg-info-subtle text-center'>{item.points}</td>
      <td className='text-center'>{item.score}</td>
    </tr>
  ));
}

const tableRowsEastern = createTableRowsEastern(east);


 function createTableRowsWestern(west) {

  return west.slice(8, 16).map((item, index) => (
    <tr key={index} className='border text-center'>
      <td>{index + 9}</td> 
      <td>
        <Link href={` /NHL/Team/${item?.shortname}`}
                className='fw-semibold'
                style={{textDecoration: 'none'}}>
          {item.shortname}
          </Link>
      </td>
      <td>{item.gp}</td>
      <td>{item.wins}</td>
      <td>{item.losts}</td>
      <td className='bg-info-subtle text-center'>{item.points}</td>
      <td className='text-center'>{item.score}</td>
    </tr>
  ));
}

const tableRowsWestern = createTableRowsWestern(west);


  return (


   <>
                {/* first row , waster conf */}
              <div className="row justify-content-evenly ">

                <div className="col-12 col-md-4">
                  <h5 className='text-center mt-3'>Eastern Conference</h5>
                 {/*  <BarChart east={east}/> */}
                 <table className='w-100  border'>
                      <thead className='border'>
                        <tr className='text-center'>
                          <th>#</th>
                          <th>Team</th>
                          <th>GP</th>
                          <th>W</th>
                          <th>L</th>
                          <th className='bg-primary-subtle text-center'>PTS</th>
                          <th className='text-center'>S</th>
                        </tr>
                      </thead>
                      <tbody>
                       {tableRowsEastern}
                      </tbody>
                    </table>
                </div>

                <div className="col-12 col-md-5">
                  <h5 className='text-center mt-3'>Teams Below the Playoff Line</h5>
                  {
                      status === 'loading' ? (
                            <div className='text-center my-5'>
                                <div className="spinner-grow" style={{color:'#9c4b0e'}} role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                        <BarChart east={east}/>
                      )
                    }
                  
                </div>
              </div>
              <hr />



              {/* sec row western conference */}
              <div className="row justify-content-evenly">

                <div className="col-12 col-md-4">

                  <h5 className='text-center mt-3'>Western Conference</h5>

                 {/*  <BarChart east={east}/> */}
                 <table className='w-100  border'>
                      <thead className='border'>
                        <tr className='text-center'>
                          <th>#</th>
                          <th>Team</th>
                          <th>GP</th>
                          <th>W</th>
                          <th>L</th>
                          <th className='bg-primary-subtle text-center'>PTS</th>
                          <th className='text-center'>S</th>
                        </tr>
                      </thead>
                      <tbody>
                       {tableRowsWestern}
                      </tbody>
                    </table>
                </div>

                <div className="col-12 col-md-5">
                  <h5 className='text-center mt-3'>Teams Below the Playoff Line</h5>
                   {
                      status === 'loading' ? (
                            <div className='text-center my-5'>
                                <div className="spinner-grow" style={{color:'#9c4b0e'}} role="status">
                                </div>
                              </div>
                             
                      ) : 
                      (
                       <BarChart2 west={west} /> 
                      )
                    }
                   
                </div>
              </div>
              <hr />




              {/* second row */}
              <div className="row justify-content-center mb-5">

                <div className="col-12 col-md-8 my-5 py-5">
                  <h5 className='text-center'>Teams Below the Playoff Line</h5>
                  <VerticalBarDown nhl={nhl}/>
                </div>

              </div>



              <style>{`
            
              table {
                position: relative;
                height: 80%;
              }

               table tr td, table tr th {
                    padding-top: 2px;
                    padding-bottom: 2px;
                }

              table tr:nth-child(even) {
                  background-color: #dbdbdb;
                }

              table tr:nth-child(odd) {
                  background-color: #f7f7f7;
                }

            
              
                .card-east:hover {
                  position: relative;
                  border: 2px dashed red;
                  cursor: pointer;
                }
              `}</style>
   </>
  )
}

export default Index