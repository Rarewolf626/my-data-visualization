import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Api from '../../services/api';
import {
    FaArrowUp,
    FaUpload,
    FaDownload
} from 'react-icons/fa'

const HomePage = () => {
    function refreshPage() {
        window.location.reload(false);
    }
    
    function convertToInternationalSystem(number) {
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        let index = 0;
        let value = number;
      
        while (value >= 1024 && index < units.length - 1) {
          value /= 1024;
          index++;
        }
      
        return value.toFixed(2) + " " + units[index];
    }

    const [topSection, setTopSection] = useState([
        {
            label: 'Maior download de dados',
            image: undefined,
            applicationLabel: 'Carregando',
            applicationDownload: '{...}'
        },
        {
            label: 'Total Upload no momento',
            image: undefined,
            applicationLabel: 'Carregando',
            applicationDownload: '{...}'
        },
        {
            label: 'Total de Download no momento',
            image: undefined,
            applicationLabel: 'Carregando',
            applicationDownload: '{...}'
        },
    ]);

    async function fetchData(){
        await Api.findHighestConsuming().then((result) => {
            let highestConsumingApplicationData = topSection.slice()
            highestConsumingApplicationData[0].applicationLabel = result.data.name;
            highestConsumingApplicationData[0].applicationDownload = result.data.download;
            highestConsumingApplicationData[0].image = result.data.img
            setTopSection(highestConsumingApplicationData)
        });

        await Api.getDownloadSum().then((result) => {
            let downloadSum = topSection.slice()
            downloadSum[2].applicationDownload = result.data.download.toString();
            downloadSum[2].applicationDownload = convertToInternationalSystem(downloadSum[2].applicationDownload)
            setTopSection(downloadSum) 
        })

        
        await Api.getUploadSum().then((result) => {
            let uploadSum = topSection.slice()
            uploadSum[1].applicationDownload = result.data.upload.toString();
            uploadSum[1].applicationDownload = convertToInternationalSystem(uploadSum[1].applicationDownload)
            setTopSection(uploadSum) 
        })
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 2000); // Call fetchData every second (1000 milliseconds)

        
        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div className="homepage">
            <div className="top-grid">
                {topSection.map((square, index) => {
                if(index == 0){
                    return(
                        <div key={index} className="square">
                            {
                                square.image != undefined ? 
                                
                            <img src={`data:image/png;base64,${square.image}`} alt={square.label} />
                            :
                            <div className='loading'> </div>
                            }
                            <label className='label'>{square.label}</label>
                            <div className='application-label'>{square.applicationLabel}</div>
                            <label className='application-download'>{square.applicationDownload}</label>
                        </div>
                    )
                }
                else if(index == 2){
                    return(
                        <div key={index} className="square">
                            <FaDownload size={50} color='white'/>
                            <label className='label'>{square.label}</label>
                            <label className='application-download'>{square.applicationDownload}</label>
                        </div>)
                }
                else if(index == 1){
                    return(
                        <div key={index} className="square">
                            <FaUpload size={50} color='white'/>
                            <label className='label'>{square.label}</label>
                           <label className='application-download'>{square.applicationDownload}</label>
                        </div>)
                }})}
            </div>
        </div>
    );
};

export default HomePage;
