import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    Area,
    Tooltip,
} from "recharts";


function CustomTooltip({active, payload, label}) {
    if (active) {
        return (
            <div className="price-group cst-tooltip d-flex flex-column">
                <span className="price-card-title">{payload[0].value}</span>
                <span className="price-card-sub-title">{label}</span>
            </div>
        );
    }
    return null;
}


const ChartExplore = () => {
    const [data, setData] = useState([]);
    const [PLAYERS, setPLAYERS] = useState([]);

    // function to fetch data from API
    function fetchData() {
        try {
            const response = axios.get('https://script.google.com/macros/s/AKfycbxCyy17CgGuQQ-mU9PhHDT2eYxbj09gjsdX6s-MX79CY1ykIYGZ57PR9sKNlj_IsJCmxQ/exec');
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    useEffect(() => {
        fetchData().then(response => {
            setData(response.data);
            const players = (response.data[response.data.length - 1].PLAYERS)
            setPLAYERS(players);
        });
    }, []);


    return (
        <div className="area col-md-6">
            <div className="card-dark">
                <div className="d-flex price-group flex-column mb-5">
                    <span className="price-card-sub-title">AXS PLAYER</span>
                    <span id={`tvlPrice`} className="price-card-title">{PLAYERS}</span>
                </div>
                <ResponsiveContainer width="100%" height={223}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="color-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stop-color="#06ce9c" stop-opacity="0.5"/>
                                <stop offset="100%" stop-color="#8FFCE1" stop-opacity="0"/>
                            </linearGradient>
                        </defs>

                        <Area
                            dataKey="PLAYERS"
                            stroke={`#8ffce1`}
                            fill="url(#color-grad)"
                        />

                        <XAxis
                            dataKey={`DATE`}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            position={{x: 0, y: -90}}
                            cursor={false}
                            content={<CustomTooltip/>}
                        />
                        {/*<CartesianGrid opacity={0.1} vertical={false}/>*/}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

}

export default ChartExplore;