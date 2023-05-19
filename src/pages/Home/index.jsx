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
            console.log("Resultado!!!!!!!!!!!!!!!")
            console.log(result.data)
            let downloadSum = topSection.slice()
            downloadSum[2].applicationDownload = result.data.download.toString();
            downloadSum[2].applicationDownload = downloadSum[2].applicationDownload.concat('B')
            setTopSection(downloadSum) 
        })
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
            console.log("Fetchdata")
        }, 2000); // Call fetchData every second (1000 milliseconds)

        
        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div className="homepage">
            <Sidebar />
            <div className="top-grid">
                {topSection.map((square, index) => {
                if(index == 0){
                    return(
                        <div key={index} className="square">
                            <img src={`data:image/png;base64,${square.image}`} alt={square.label} />
                            <label className='label'>{square.label}</label>
                            <div className='application-label'>{square.applicationLabel}</div>
                            <label className='application-download'>{square.applicationDownload}</label>
                        </div>
                    )
                }
                else if(index == 2){
                    return(
                        <div key={index} className="square">
                            <FaDownload size={50}/>
                            <label className='label'>{square.label}</label>
                            <div className='application-label'>{square.applicationLabel}</div>
                            <label className='application-download'>{square.applicationDownload}</label>
                        </div>)
                }
                else if(index == 1){
                    return(
                        <div key={index} className="square">
                            <FaUpload size={50}/>
                            <label className='label'>{square.label}</label>
                            <div className='application-label'>{square.applicationLabel}</div>
                            <label className='application-download'>{square.applicationDownload}</label>
                        </div>)
                }})}
            </div>
        </div>
    );
};

export default HomePage;
