
/* eslint-disable @next/next/no-img-element */
import React , {useEffect, useCallback, useState } from 'react'
import axios from 'axios';
import { tree } from 'd3';



const Index = () => {


 const [data, setData] = useState()
 const [loading, setLoading] = useState(false)

  
 const fetchGameData = useCallback(async () => {
  
  try {
    setLoading(true)
    const res = await axios.get(`/api/TopNav/TopNavNHL`); 
    setData(res.data);
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}, []);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);
 
  

 const [gamesList, setGamesList] = useState([]);
 const [playedList, setPlayedList] = useState([])



  useEffect(() => {
    const x = data?.data?.games;
    const filteredGames = [];
    const playedGames = []
    

    for (let i = 0; i < x?.length; i++) {
      if (x[i]?.score?.status?.startsWith('na programe')) {
        filteredGames.push(x[i]);
      }
    }

    for(let i = 0; i < x?.length; i++) {
      if (x[i]?.score?.status?.startsWith('kon')) {
        playedGames.push(x[i]);
      }
    }

    setGamesList(filteredGames);
    setPlayedList(playedGames)
  }, [data]);


const flag = (param) => {
  if (param.startsWith('CZE')) {
    return flagInfo('../../Flags/cz.png');

  } else if (param.startsWith('SWE')) {
    return flagInfo('../../Flags/swe.png');

  } else if (param.startsWith('USA')) {
    return flagInfo('../../Flags/usa.png');

  } else if (param.startsWith('FIN')) {
    return flagInfo('../../Flags/fin.png');

  } else if (param.startsWith('CAN')) {
    return flagInfo('../../Flags/ca.png');

  } else if (param.startsWith('GER')) {
    return flagInfo('../../Flags/ger.png');

  } else if (param.startsWith('NOR')) {
    return flagInfo('../../Flags/nor.png');
  } else if (param.startsWith('LAT')) {
    return flagInfo('../../Flags/lat.png');
  } else if (param.startsWith('SVK')) {
    return flagInfo('../../Flags/svk.png');
  } else if (param.startsWith('SUI')) {
    return flagInfo('../../Flags/swi.png');
  } else {
    return null; // or return <></> for an empty element
  }
};

  const flagInfo = (source) => {
    return <img src={source} 
                style={{width: '30px', 
                height: '20px', 
                position: 'relative', 
                top: '6px',
                borderRadius: '9px',
                marginRight: '3px'}} 
                alt="CZE Flag" />;
  }




  return (

   <>


         <div className='nat-top'>

            <ul className='d-flex ' style={{height: '67px'}}>

              {
                loading === true ? (
                  <>
                 
                       <div className="spinner-grow text-primary mx-auto mt-3" role="status">
                       </div>
                  
                  </>
                ) : (
                  <>
                      <li className='px-3 fw-semibold fs-5' 
                          style={{position: 'relative', top: '20px'}}>
                         U20
                      </li>
                     {/* odohrane zapasy */}
                      {playedList.map((item, i) => (

                        <>
                            
                             
                             <li key={i} 
                                className='border px-3 d-flex' 
                                style={{listStyle: 'none', width: '190px',height: '100%'}}>

                              <div style={{width: '100px'}}>
                                <div className='d-flex justify-content-between'>

                                  <div className='d-flex'>
                                    {flag(item?.team1short)}
                                    <p className={'fs-5 m-0'}>{item?.team1short}</p>
                                  </div>

                                  <p className={'fs-5 fw-bold m-0'}>{item?.score?.goals1}</p>
                                </div>

                                <div className='d-flex justify-content-between'>
                                  <div className='d-flex'>
                                    {flag(item?.team2short)}
                                    <p className={'fs-5'}>{item?.team2short}</p>
                                  </div>
                                  
                                  <p className={'fs-5 fw-bold'}>{item?.score?.goals2}</p>
                                </div>  
                              </div> 

                              <h6 style={{position: 'relative', top: '20px', left: '9px'}}>
                                {item?.score?.status.startsWith('konečný') && 'Final'}
                                {item?.score?.status.startsWith('na') && 'Coming'}
                              </h6> 

                            </li>

                        </>
                          
                    ))}
                  </>
                )
              }
             
             

                {/*   <li className='px-2 bg-secondary-subtle'
                      style={{paddingTop: '20px'}}>
                    Next
                  </li> */}

               
                {/* zapasy na programe */}
                {/* {
                  loading === true ? (
                    <>
                       <div className="spinner-grow text-primary mx-auto mt-3" role="status">
                      </div>
                    </>
                  ) : (
                    <>
                        
                         {gamesList.map((item, i) => (

                          <li key={i} 
                                className='border px-3 d-flex' 
                                style={{listStyle: 'none', width: '190px',height: '100%'}}>

                              <div style={{width: '100px'}}>
                                <div className='d-flex justify-content-between'>

                                  <div className='d-flex'>
                                    {flag(item?.team1short)}
                                    <p className={'fs-5 m-0'}>{item?.team1short}</p>
                                  </div>

                                  <p className={'fs-5 fw-bold m-0'}>{item?.score?.goals1}</p>
                                </div>

                                <div className='d-flex justify-content-between'>
                                  <div className='d-flex'>
                                    {flag(item?.team2short)}
                                    <p className={'fs-5'}>{item?.team2short}</p>
                                  </div>
                                  
                                  <p className={'fs-5 fw-bold'}>{item?.score?.goals2}</p>
                                </div>  
                              </div> 

                              <h6 style={{position: 'relative', top: '20px', left: '9px'}}>
                                {item?.score?.status.startsWith('konečný') && 'Final'}
                                {item?.score?.status.startsWith('na') && 'Coming'}
                              </h6> 

                            </li>
                        ))}
                    </>
                  )
                }
 */}
               


           </ul>

         </div>


    

     
    
 

    <style>{`

      .nat-top {
          width: 100%;
          height: 80px; 
          overflow-x: auto; 
          overflow-y: hidden;
      }

      .nat-top ul {
          display: flex;
          flex-wrap: nowrap; 
          height: 67px;
          padding-left: 0;
          margin: 0;
          list-style-type: none;
      }

     
    `}</style>
   
   </>

  )
}

export default Index 