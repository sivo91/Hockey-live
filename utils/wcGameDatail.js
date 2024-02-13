/* eslint-disable @next/next/no-img-element */





 export default function logo (param, w, h) {
    if(param === 'AUT') {
       return <img src="../../../Flags/aus.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'DEN') {
       return <img src="../../../../Flags/dan.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } if(param === 'FIN') {
       return <img src="../../../../Flags/fin.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } if(param === 'GBR') {
       return <img src="../../../../Flags/gbr.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } if(param === 'CAN') {
       return <img src="../../../../Flags/ca.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } if(param === 'CZE') {
       return <img src="../../../../Flags/cz.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } if(param === 'NOR') {
       return <img src="../../../../Flags/nor.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'SUI') {
       return <img src="../../../../Flags/swi.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'FRA') {
       return <img src="../../../../Flags/fra.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'GER') {
       return <img src="../../../../Flags/ger.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'SWE') {
       return <img src="../../../../Flags/swe.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'KAZ') {
       return <img src="../../../Flags/kaz.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'LAT') {
       return <img src="../../../Flags/lat.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'SVK') {
       return <img src="../../../Flags/svk.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'POL') {
       return <img src="../../../Flags/pl.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch"  className="border border rounded-2"/>
    } else if(param === 'USA') {
       return <img src="../../../Flags/usa.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'HUN') {
       return <img src="../../../Flags/hungary.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2"/>
    } else if(param === 'SLO') {
       return <img src="../../../Flags/slovenia.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'RUS') {
       return <img src="../../../Flags/rus.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'ITA') {
       return <img src="../../../Flags/italy.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'BLR') {
       return <img src="../../../Flags/blrus.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    } else if(param === 'KOR') {
       return <img src="../../../Flags/kor.png" style={{width: `${w.toString()}px`, height: `${h.toString()}px` }} alt="wch" className="border border rounded-2" />
    }
  }