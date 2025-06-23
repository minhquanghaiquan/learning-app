import React from "react";
import { Link } from "react-router-dom";
import devices from "./data";

const DeviceList = () => (
  <div className="container py-10">
    <h1 className="text-2xl font-bold mb-6">Danh sách thiết bị</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {devices.map((device) => (
        <Link to={`/devices/${device.id}`} key={device.id}
          className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer bg-white">
          <img src={device.icon} alt={device.name} className="w-32 h-32 object-contain mx-auto mb-2"/>
          <h2 className="text-xl font-semibold text-center">{device.name}</h2>
          <p className="text-sm text-gray-500 text-center">{device.summary}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default DeviceList;
