




import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Index = () => {

  const [data, setData] = useState();
   const [team, setTeam] = useState("MTL");
  //console.log(data);



 const fetchGameData = useCallback(async () => {
  if (!team) {
    console.log("No team specified");
    return;
  }

  try {
    const queryParam = encodeURIComponent(team);
    const res = await axios.get(`/api/NHL/findTeam?team=${queryParam}`); 
    setData(res.data);
  } catch (error) {
    console.log(error);
  }
}, [team]);

useEffect(() => {
  fetchGameData();
}, [fetchGameData]);


  return (
    <>
      <h3 className='text-center my-5'>Search for Team</h3>

     
      <Link href={'/'}
            style={{ textDecoration: 'none', width: '200px' }}
            className='btn btn-primary rounded-1 vstack mx-auto'>
        Back
      </Link>
    </>
  );
}

export default Index;
