import React, { PureComponent, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBBupXMdn6wJ_NqGx_xlVw9mdB5q25PoU",
  authDomain: "chickencoop-e7c0d.firebaseapp.com",
  databaseURL: "https://chickencoop-e7c0d-default-rtdb.firebaseio.com",
  projectId: "chickencoop-e7c0d",
  storageBucket: "chickencoop-e7c0d.appspot.com",
  messagingSenderId: "513876009396",
  appId: "1:513876009396:web:743829cf58eb731887d2e1",
  measurementId: "G-3R3SP3NE6L",
};

const app = initializeApp(firebaseConfig);
// Initialize firebase database and get the reference of firebase database object.
const database = getDatabase(app);

const sensorData = ref(database, "/");

const data = [
  {
    name: "Day 1",
    lux: 40,
    temp: 24,
    amt: 2400,
  },
  {
    name: "Day 2",
    lux: 30,
    temp: 13,
    amt: 2210,
  },
  {
    name: "Day 3",
    lux: 20,
    temp: 98,
    amt: 2290,
  },
  {
    name: "Day 4",
    lux: 27,
    temp: 39,
    amt: 2000,
  },
  {
    name: "Day 5",
    lux: 10,
    temp: 48,
    amt: 2181,
  },
];

function Charts() {
  const [temperature1, setTemperature1] = useState([0, 0, 0, 0, 0]);
  const [temperatureChart, setTemperatureChart] = useState([]);
  const [lux1, setLux1] = useState([0, 0, 0, 0, 0]);
  const [luxChart, setLuxChart] = useState([]);
  const [humidity1, setHumidity1] = useState([0, 0, 0, 0, 0]);
  const [humidityChart, setHumidityChart] = useState([]);

  const [pData, setPData] = useState();

  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        setTemperature1((oldArray) => [data.Temperature, ...oldArray]);
        setLux1((oldArray) => [data.Lux, ...oldArray]);
        setHumidity1((oldArray) => [data.Humidity, ...oldArray]);

        setPData(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);
  useEffect(() => {
    const firstFiveItems = temperature1.slice(0, 5);
    const firstFiveItems1 = lux1.slice(0, 5);
    const firstFiveItems2 = humidity1.slice(0, 5);
    firstFiveItems.map((item, index) => {
      setTemperatureChart((oldArray) => [
        ...oldArray,
        { temp: item, name: `Day ${index + 1}` },
      ]);
    });
    firstFiveItems1.map((item, index) => {
      setLuxChart((oldArray) => [
        ...oldArray,
        { temp: item, name: `Day ${index + 1}` },
      ]);
    });
    firstFiveItems2.map((item, index) => {
      setHumidityChart((oldArray) => [
        ...oldArray,
        { temp: item, name: `Day ${index + 1}` },
      ]);
    });
  }, []);
  return (
    <div className=" flex flex-col spae-y-4 pt-10">
      <div className=" flex space-x-2">
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                temp: temperature1[0],
                name: "Day 1",
              },
              {
                temp: temperature1[1],
                name: "Day 2",
              },
              {
                temp: temperature1[2],
                name: "Day 3",
              },
              {
                temp: temperature1[3],
                name: "Day 4",
              },
              {
                temp: temperature1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                lux: lux1[0],
                name: "Day 1",
              },
              {
                lux: lux1[1],
                name: "Day 2",
              },
              {
                lux: lux1[2],
                name: "Day 3",
              },
              {
                lux: lux1[3],
                name: "Day 4",
              },
              {
                lux: lux1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="lux" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className=" flex space-x-2">
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                humidity: humidity1[0],
                name: "Day 1",
              },
              {
                humidity: humidity1[1],
                name: "Day 2",
              },
              {
                humidity: humidity1[2],
                name: "Day 3",
              },
              {
                humidity: humidity1[3],
                name: "Day 4",
              },
              {
                humidity: humidity1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                temp: temperature1[0],
                name: "Day 1",
              },
              {
                temp: temperature1[1],
                name: "Day 2",
              },
              {
                temp: temperature1[2],
                name: "Day 3",
              },
              {
                temp: temperature1[3],
                name: "Day 4",
              },
              {
                temp: temperature1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
