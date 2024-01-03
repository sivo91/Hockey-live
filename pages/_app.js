import '@/styles/globals.css'
import Layout from '../components/Layout'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/reduxFile/store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Footer from '@/components/Footer'
import '../styles/Home.module.css'
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from "react";






function App({ Component, pageProps: {session, ...pageProps} }) {

 useEffect(() => {
    // Init tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <>
       <Head>

       {/*  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"/> */}

       
      </Head>


          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></Script>


     
        <Provider store={store}>

           <Layout>
                <NextNProgress color="#0a0a0a" />
                <Component {...pageProps}/>
                <Footer />
           </Layout>

        </Provider>

        <ToastContainer position='top-center' limit={1} /> 

       
    </>
  )
}



export default App;