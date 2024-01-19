
import React,{useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import { Tooltip } from '@nextui-org/react';
import Logo from '@/utils/wchLogo'
import Link from 'next/link';

const Index = ({ year }) => {


  const [load, setLoad] = useState(false)
  const [groupA, setGroupA] = useState(null)
  const [groupB, setGroupB] = useState(null)
  console.log(groupA)


  
const fetchGameData = useCallback(async () => {
  try {
    setLoad(true)
    const res = await axios.get(`/api/WCH/zoznamZapasov?year=${year}`);
    if(res.data) {
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



  let allTeamsA = [];
  let allTeamsB = []
  
  // create arrs and loop 
  for(const team in groupA) {
      const x = groupA[team]
      allTeamsA.push(x)
  }

  for(const team in groupB) {
      const x = groupB[team]
      allTeamsB.push(x)
  }
 
  console.log(allTeamsB)


  return (
  <> 
    
     <h3 className='text-center '>Groups</h3>
      {
        load  ? ( <>
                       <div className='text-center my-5'>
                         <div className="spinner-grow" style={{color:'#2dc2b3'}} role="status">
                         </div>
                        </div> 
                 </>)  :
                 (<>

                 <div className="container-fluid">
                  <div className="row justify-content-center gap-3">

                   
                  
                     <div className="skupinaA">
                        { 
                          allTeamsA.map( (item, i) => (
                              
                            <Link href={`#}`} key={i} >
                              <Tooltip content={item.shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                              <div className="skupinaImgBox" >
                                {Logo(item.shortname,150,90)}
                              </div>
                              </Tooltip> 
                            </Link>
                            ))
                        }
                    </div>
                 

                  
              
                      <div className="skupinaB">
                      { 
                           allTeamsB.map( (item, i) => (
                              
                            <Link href={`#}`} key={i} >
                              <Tooltip content={item.shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                              <div className="skupinaImgBox" >
                                {Logo(item.shortname,150,90)}
                              </div>
                              </Tooltip> 
                            </Link>
                            ))
                       }
                    
                      </div> 
{/* 
                      
                          {allTeamsB.map((item, i) => {
                              // Check if the index is even
                              if (i % 2 === 0) {
                                  return (
                                      <div className="row" key={`row-${i}`}>
                                          <Link href={`#}`} key={`link-${i}`}>
                                              <Tooltip content={item.shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                                  <div className="skupinaImgBox">
                                                      {Logo(item.shortname, 150, 90)}
                                                  </div>
                                              </Tooltip>
                                          </Link>
                                          {allTeamsB[i + 1] && (
                                              <Link href={`#}`} key={`link-${i + 1}`}>
                                                  <Tooltip content={allTeamsB[i + 1].shortname} color='primary' className='text-light px-2 fw-semibold rounded-2'>
                                                      <div className="skupinaImgBox">
                                                          {Logo(allTeamsB[i + 1].shortname, 150, 90)}
                                                      </div>
                                                  </Tooltip>
                                              </Link>
                                          )}
                                      </div>
                                  );
                              } else {
                                  // For odd indices, do nothing (as they are already included in the row with the previous item)
                                  return null;
                              }
                          })} */}
                   

              
                  

                 
                 
                  </div>
                 </div>
                 
      
                 
                 </>)
           }


       

            <style>{`

               .groupContainer {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
               }
              

                .skupinaA, .skupinaB, .skupinaC {
                  position: relative;
                  min-width: 345px;
                  max-width: 336px;
                  padding: 10px 0 ;
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                  border: 1px solid black;
                  border-radius: 8px;
                  background: #f5f5f5;
                }
                .skupinaImgBox {
                  position: relative;
                  width: 150px;
                  height: 92px;
                  margin: 10px;
                  overflow: hidden;
                  background: black;
                  border-radius: 6px;
                  border: 1px solid gray;
                }

                .skupinaImgBox img {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
            `}</style>

  
  </>
  )
}

export default Index