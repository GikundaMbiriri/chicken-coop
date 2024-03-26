import React, { useState, useEffect } from "react";
import { CiTempHigh } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
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

function CardSection() {
  const [pData, setPData] = useState();
  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        setPData(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);
  return (
    <div className=" flex  justify-between px-10 pt-10 text-white ">
      <div className="   p-2 bg-green flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Temperature</div>
          <div className="">
            <CiTempHigh className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{pData?.Temperature}</div>
      </div>
      <div className="   p-2 bg-yellow flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Light Intensity</div>
          <div className="">
            <CiLight className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{pData?.Lux} Lux</div>
      </div>
      <div className="   p-2 bg-blue flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Humidity</div>
          <div className="">
            <WiHumidity className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{pData?.Humidity}</div>
      </div>
      <div className="   p-2 bg-green flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Temperature</div>
          <div className="">
            <CiTempHigh className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{pData?.Temperature} C</div>
      </div>
    </div>
  );
}

export default CardSection;
