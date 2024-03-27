import React, { useState, useEffect } from "react";
import { GiChicken } from "react-icons/gi";
import Alert from "./modals/Alert";
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

function Navbar() {
  const [pData, setPData] = useState();
  const [showAlert, setShowAlert] = useState();
  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        setPData(data);
        if (data.Temperature > 25.5) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      } else {
        console.log("Data not found");
      }
    });
  }, []);
  return (
    <div className=" bg-chicken-coop-blue w-full py-2 px-4 flex justify-between text-white   ">
      <div className=" flex space-x-1  w-1/2 items-center">
        <div className=" text-white">
          <GiChicken className=" text-4xl" />
        </div>
        <div className=" text-2xl font-semibold  px-4  py-1">Chicken Coop</div>
      </div>
      <div className=" flex w-1/2  space-x-6 items-center">
        <div className=" flex space-x-2 items-center ">
          <div className="">Temperature</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {pData?.Temperature}
          </div>
        </div>
        <div className=" flex space-x-2 items-center">
          <div className="">Humidity</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {pData?.Humidity}
          </div>
        </div>
        <div className=" flex space-x-2 items-center">
          <div className="">Light Intensity</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {pData?.Lux}
          </div>
        </div>
      </div>
      {showAlert && <Alert setShowAlert={setShowAlert} />}
    </div>
  );
}

export default Navbar;
