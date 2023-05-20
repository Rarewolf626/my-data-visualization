import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Api from '../../services/api';
import {
    FaArrowUp,
    FaUpload,
    FaDownload
} from 'react-icons/fa'

const Reports = () => {
    const [applications, setApplications] = useState([{"name":"test"}])
    async function fetchData(){
        await Api.getAllApplications().then((result) => {
            console.log("REsullt>>")
            console.log(result.data.sortedApplications)
            if(result.data.sortedApplications != undefined)
                setApplications(result.data.sortedApplications)
        });

    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000); // Call fetchData every second (1000 milliseconds)

        
        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, []); 

    return(
        <div className='container'>
            <Sidebar />
                            <div className='title'>
                                Aplicações que mais consomem
                            </div>  
            {
            
                applications.map((item, index) =>
                 {
                    if(item.name != 'test'){
                        return(
                            <>
                            <div className='label'> 
                            <img src={`data:image/png;base64,${item.image}`} />
                            <div className='text'>

                            {item.name}
                            </div> </div>
                            </>
                        )

                    }
                })
            }
        </div>
    )
}

export default Reports;