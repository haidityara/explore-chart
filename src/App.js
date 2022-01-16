import {format, parseISO, subDays} from "date-fns";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    Area,
    Tooltip,
    BarChart,
    Bar,
    Rectangle
} from "recharts";
import {useState} from "react";

const data = [];
for (let num = 31; num >= 0; num--) {
    data.push({
        date: subDays(new Date(), num).toISOString().substr(0, 10),
        value: 1 + Math.random(),
    });
}

function App() {

    let [posData, setposData] = useState({});

    function CustomTooltip({active, payload, label}) {
        if (active) {
            return (
                <div className="price-group cst-tooltip d-flex flex-column">
                    <span className="price-card-title">${payload[0].value.toFixed(2)}</span>
                    <span className="price-card-sub-title">{format(parseISO(label), "MMM d, yyyy")}</span>
                </div>
            );
        }
        return null;
    }


    const CustomCursor = (props) => {
        const {barX, y, barWidth, barHeight} = props;
        return <Rectangle fill="#7c7c7c" x={barX} y={y} width={barWidth} height={barHeight}/>;
    };

    return (
        <div className="App">
            <div className="radiant"></div>
            <div className="container">
                <div className="row">
                    <div className="area col-md-6">
                        <div className="card-dark">
                            <div className="d-flex price-group flex-column mb-5">
                                <span className="price-card-sub-title">TVL</span>
                                <span id={`tvlPrice`} className="price-card-title">$13,4</span>
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
                                        dataKey="value"
                                        stroke={`#8ffce1`}
                                        fill="url(#color-grad)"
                                    />

                                    <XAxis
                                        dataKey={`date`}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(str) => {
                                            const date = parseISO(str);
                                            // if (date.getDate() % 7 === 0) {
                                            //     return format(date, " d");
                                            // }
                                            return format(date, " d");
                                        }}
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
                    <div className="area col-md-6">
                        <div className="card-dark">
                            <div className="d-flex price-group flex-column mb-5">
                                <span className="price-card-sub-title">Volume</span>
                                <span id={`volPrice`} className="price-card-title">$77,5m</span>
                            </div>
                            <ResponsiveContainer width="100%" height={223}>
                                <BarChart width={150} height={40} data={data}>
                                    <XAxis
                                        dataKey={`date`}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(str) => {
                                            const date = parseISO(str);
                                            return format(date, " d");
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#12B0CA"
                                         radius={[10, 10, 0, 0]}
                                         onMouseOver={(data) => {
                                             setposData(data);
                                         }}
                                    />
                                    <Tooltip
                                        cursor={<CustomCursor
                                            barHeight={posData.y}
                                            barWidth={posData.width}
                                            barX={posData.x}
                                            barY={posData.y}
                                        />}
                                        content={<CustomTooltip/>}
                                        position={{x: 0, y: -90}}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                TEAM TOKEN
            </div>
        </div>
    );
}

export default App;
