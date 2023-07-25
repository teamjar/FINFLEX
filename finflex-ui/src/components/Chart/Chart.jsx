import React, { useContext, useEffect, useState } from "react";
import Card from '../Card/Card'
import ChartFilter from "../ChartFilter/ChartFilter";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import { StockContext } from '../../Context/StockContext';
import { fetchHistoricalData } from "../api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../../helpers/date-helper";
import { chartConfig } from "../../constants/config";
import './Chart.css';

const Chart = () => {
    const [filter, setFilter] = useState("1W");
  
    const { stockSymbol } = useContext(StockContext);
  
    const [data, setData] = useState([]);
  
  
    useEffect(() => {
      const getDateRange = () => {
        const { days, weeks, months, years } = chartConfig[filter];
  
        const endDate = new Date();
        const startDate = createDate(endDate, -days, -weeks, -months, -years);
  
        const startTimestampUnix = convertDateToUnixTimestamp(startDate);
        const endTimestampUnix = convertDateToUnixTimestamp(endDate);
        return { startTimestampUnix, endTimestampUnix };
      };
  
      const updateChartData = async () => {
        try {
            const { startTimestampUnix, endTimestampUnix } = getDateRange();
            const resolution = chartConfig[filter].resolution;
            const result = await fetchHistoricalData(
                stockSymbol,
                resolution,
                startTimestampUnix,
                endTimestampUnix
            );
            console.log('API response:', result); 
            console.log("Stock Symbol: ", stockSymbol);
            setData(formatData(result));
        } catch (error) {
            setData([]);
            console.log(error);
        }
    };
    
  
      updateChartData();
    }, [stockSymbol, filter]);

    const formatData = (data) => {
      if (data && data.c) {
          return data.c.map((item, index) => {
              return {
                  value: item.toFixed(2),
                  date: convertUnixTimestampToDate(data.t[index]),
              };
          });
      } else {
          return []; 
      }
  };

  return (
    <Card>
      <div className="chart-container">
        <ul className="filter-list">
          {Object.keys(chartConfig).map((item) => (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          ))}
        </ul>
  
        <div className="area-chart">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#70A288" stopOpacity={1} />
                  <stop offset="95%" stopColor="#70A288" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#031D44"
                fill="url(#chartColor)"
                fillOpacity={1}
                strokeWidth={0.5}
              />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin", "dataMax"]} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
  




};

export default Chart;