
import React,{useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import { Tooltip } from '@nextui-org/react';
import Logo from '@/utils/wcGameDatail'
import Link from 'next/link';
import { useSelector,  } from 'react-redux';




const Index = () => {


  const [load, setLoad] = useState(false)
  const [groupA, setGroupA] = useState(null)
  const [groupB, setGroupB] = useState(null)
   const year = useSelector((state) => state.year.year);


  
const fetchGameData = useCallback(async () => {
  try {
    setLoad(true)
    const res = await axios.get(`/api/WCH/zoznamZapasov?year=${year}`);
    if(res.data) {
      console.log(res.data)
      setGroupA(res.data.data.group.A)
      setGroupB(res.data.data.group.B)
    }
    setLoad(false)
  } catch (error) {
    console.error(error);
    setLoad(false)
  }
}, [year]);


  useEffect(() => {
         fetchGameData();
  }, [fetchGameData]);

 /***********************  Groups ************************** */

  let allTeamsA = [];
  let allTeamsB = []
  
  // create arrs and loop  - groups
  for(const team in groupA) {
      const x = groupA[team]
      allTeamsA.push(x)
  }

  for(const team in groupB) {
      const x = groupB[team]
      allTeamsB.push(x)
  }
 
   




/******************** Recursive func from C++ class *********************** */


/* 
const merge = (left, right) => {
    let sortedArray = []
    


    // merge groups
    while (left.length && right.length) {
        if (left[0].points > right[0].points) {
            sortedArray.push(left.shift())
        } else {
            sortedArray.push(right.shift())
        }
    }

    // concat teams
    return [...sortedArray, ...left, ...right]
}


const mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr
    }

    // find the middle point to divide the array into two groups
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)

    // Call mergeSort recursively for the two halves
    return merge(mergeSort(left), mergeSort(right))
}


const standingGroupA = mergeSort(allTeamsA);
console.log(standingGroupA)

console.log(standingGroupA) */


const x = allTeamsA.sort((a, b) => b.points - a.points)
const y = allTeamsB.sort((a, b) => b.points - a.points)


/************************** use pivot ************************ */
/* 
const quickSort = (arr) => {
    if (arr.length < 2) {
        return arr
    }

    let pivot = arr[0]   // pivot
    let left = []       // less than pivot
    let right = []     // greater than pivot

    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].points > pivot.points) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // merge data
    return [...quickSort(left), pivot, ...quickSort(right)]
}

const standingGroupB = quickSort(allTeamsB) */






  return (
  <> 
      
      <h3 className='text-center my-3'>IIHF | {year}-{Number(year) + 1}</h3>
   
      {
        load  ? ( <>
                       <div className='text-center my-5'>
                         <div className="spinner-grow" /* style={{color:'#2dc2b3'}} */ 
                              style={{backgroundImage: 'radial-gradient(circle, white, black)'}} role="status">
                         </div>
                        </div> 
                 </>)  :
                 (<>

                
               
                 <div className="panel mb-5">


                     {/* group A */}
                    <div className="box mx-2 my-2">
                       <table className='table-bordered'>
                          <thead>
                            <tr>
                              <th colSpan="2" className='text-center'>Group A</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allTeamsA.map((team, index) => (
                              index % 2 === 0 ? (
                                <tr key={index}>
                                  <td  key={team.shortname}>
                                    <Tooltip content={team.shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                      <Link href={`/WCH/team/${team.shortname}`}>
                                        {Logo(team.shortname, 57, 40)}
                                      </Link> 
                                    </Tooltip>
                                  </td>
                                  {allTeamsA[index + 1] && (
                                    <td  key={allTeamsA[index + 1].shortname} className='py-3'>
                                      <Tooltip content={allTeamsA[index + 1].shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                      <Link href={`/WCH/team/${allTeamsA[index + 1].shortname}`}>
                                        {Logo(allTeamsA[index + 1].shortname, 57, 40)}
                                      </Link> 
                                    </Tooltip>
                                      
                                    </td>
                                  )}
                                </tr>
                              ) : null
                            ))}
                          </tbody>
                        </table>
                    </div>
                         
                       {/* group B */}  
                    <div className="box mx-2 my-2">
                      <table className='table-bordered'>
                              <thead>
                                <tr>
                                  <th colSpan="2" className='text-center'>Group B</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allTeamsB.map((team, index) => (
                                  index % 2 === 0 ? (
                                    <tr key={index}>
                                      <td className='text-center'>
                                        <Tooltip content={team.shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                          <Link href={`/WCH/team/${team.shortname}`}>
                                            {Logo(team.shortname, 57, 40)}
                                          </Link> 
                                        </Tooltip>
                                      </td>
                                      {allTeamsB[index + 1] && (
                                        <td className='text-center py-3'>
                                          <Tooltip content={allTeamsB[index + 1].shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                          <Link href={`/WCH/team/${allTeamsB[index + 1].shortname}`}>
                                            {Logo(allTeamsB[index + 1].shortname, 57, 40)}
                                          </Link> 
                                        </Tooltip>
                                          
                                        </td>
                                      )}
                                    </tr>
                                  ) : null
                                ))}
                              </tbody>
                            </table>
                    </div>
                   
                    {/* standing group A */}
                    <div className="box2 mx-2 my-2">
                    <div>
                      <table className='table-bordered'>
                        <thead>
                          <tr>
                              <th colSpan="4" className='text-center'>Standing Group A</th>
                          </tr>
                          <tr>
                            <th className='py-1'>#</th>
                            <th className='py-1'>Team</th>
                            <th className='py-1'>GP</th>
                            <th className='py-1'>PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            x &&
                            x.map((team, idx) => (
                              <>
                                  <tr key={idx}>
                                    
                                    <td className='py-1'>{idx + 1}</td>
                                    <td className='py-1'>{team.shortname}</td>
                                    <td className='py-1'>{team.gp}</td>
                                    <td className='py-1'>{team.points}</td>
                                  </tr>
                              </>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    </div>

                    <div className="box2 mx-2 my-2">
                    <div>
                      <table className='table-bordered'>
                        <thead>
                          <tr>
                              <th colSpan="4" className='text-center'>Standing Group B</th>
                          </tr>
                          <tr>
                            <th className='py-1'>#</th>
                            <th className='py-1'>Team</th>
                            <th className='py-1'>GP</th>
                            <th className='py-1'>PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            y &&
                            y.map((team, idx) => (
                              <>
                                  <tr key={idx}>
                                    <td className='py-1'>{idx + 1}</td>
                                    <td className='py-1'>{team.shortname}</td>
                                    <td className='py-1'>{team.gp}</td>
                                    <td className='py-1'>{team.points}</td>
                                  </tr>
                              </>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    </div>

                 </div>
                         
                 
                 </>)
           }


       

            <style>{`

            .table-bordered {
                border-collapse: collapse;
                width: 100%;
              }

              .panel {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }

              .box {
                position: relative;
                min-width: 300px;
              }

              .box2 {
                position: relative;
                min-width: 300px;
              }

              .table-bordered th, .table-bordered td {
                padding: 13px 0;
                text-align: left;
                text-align: center;
              }

              .table-bordered th {
                background-color: #f2f2f2;
              }


              
            `}</style>

  
  </>
  )
}

export default Index