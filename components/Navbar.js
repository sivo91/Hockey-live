
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userLogOut } from '@/reduxFile/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import NavbarTop from './NavbarTop'
import { selectYear } from '@/reduxFile/selectYearSlice';




const data = [
 
  {
    title: "NHL",
    subtitle: [
      { sublink: "Leading Teams", url: "/NHL/Leading/Leading" },
      { sublink: "Struggling Teams", url: "/NHL/Struggle/Struggle" },
      { sublink: "Standings", url: "/NHL/Standings/Standings" },
      { sublink: "Players Statistics", url: "/NHL/BestPlayers/BestPlayers" },
      { sublink: "Schedule", url: "/NHL/Schedule/Index" },
      { sublink: "Search", url: "/NHL/Search/Search" },
    ],
  },
  {
    title: "WCH",
    subtitle: [
      { sublink: "Groups", url: "/WCH/Groups/Groups" },
      { sublink: "Schedule", url: "/WCH/Schedule/Schedule" },
    ],
  },
  {
    title: "Contact",
    subtitle: [
      { sublink: "Contact", url: "/contact" },
    ],
  }
];



const Navbar = () => {

//const { user } = useSelector((state) => state.userAuth)

const [selectedYear, setSelectedYear] = useState('');

const dispatch = useDispatch()
const router = useRouter()

  useEffect(() => {
   // console.log('useState year', selectedYear);
    dispatch(selectYear(selectedYear))
  }, [selectedYear, dispatch]);

 // close navbar ul
const handleNavbar = () => {
   const navbarToggler = document.getElementById('navbarNavDropdown')
   navbarToggler.className = 'collapse navbar-collapse'
 }

const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  
   // Generate years dynamically
    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        let startYear = currentMonth >= 8 ? currentYear + 1 : currentYear; 

        let years = [];

        for (let i = 0; i < 10; i++) {
            years.push(startYear - i);
        }

        return years;
    };


    // automaticky generuj sezonu
   useEffect(() => {

    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1; 

    if (thisMonth < 7) {
      setSelectedYear(thisYear - 1);
    } else {
      setSelectedYear(thisYear);
    }

  }, []); 


  

  return (
    <>

     

          <nav className='m-0 p-0' style={{height: '75px'}}>
            <NavbarTop/>
          </nav> 
      
          <nav className="navbar navbar-expand-lg bg-body-tertiary">

        
          
            <Link href={'/'} 
                  onClick={handleNavbar}

                  className="navbar-brand ms-3">
               Home
            </Link>


            <button
              className="navbar-toggler me-4 mt-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse " id="navbarNavDropdown">

              <ul className="navbar-nav">
                

                {data.map((link, index) => (
                  <li
                    className="nav-item dropdown shadow-none fw-semibold fs-5"
                    id='nav-link-hover'
                    key={index} >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {link.title}
                    </a>
                    <ul className="dropdown-menu" style={{width: '300px'}}>
                      {link.subtitle.map((item, subIndex) => (
                        <li key={subIndex} onClick={handleNavbar}>
                          <Link className="dropdown-item" href={item.url}>
                            {item.sublink}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

               <select className="form-select form-select-lg  me-3"
                              id='select_form'
                              value={selectedYear} onChange={handleChangeYear}
                              style={{width: '300px', margin: '0 auto'}} 
                              aria-label="Large select example">
                          <option>Select Season</option>
                          { 
                              generateYears().map(year => (
                                // year - 1 / lebo rocnik 2023 sa rata 23/24
                                <option key={year} value={year - 1}>
                                    {`${year - 1}/${year}`}
                                </option>
                          ))}
              </select>


            </div>

          
             

            
          </nav>

 


          <style>{`
          
          @media (max-width: 992px) { 
             
           #select_form {
            margin: 20px!important;
           }

            li {
              position:relative;
              padding-left: 40px;
            }




           }
          
          
          `}</style>



    </>
  );
};

export default Navbar;