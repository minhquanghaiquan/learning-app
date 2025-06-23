import React, { useState } from "react";
import { Link } from "react-router-dom";
import devices from "./data";
import CompareDevices from "./CompareDevices";

const DeviceList = () => {
  const [selected, setSelected] = useState([]);

  // Hàm thêm/xóa thiết bị khỏi danh sách so sánh
  const toggleDevice = (device) => {
    setSelected((prev) =>
      prev.find((d) => d.id === device.id)
        ? prev.filter((d) => d.id !== device.id)
        : [...prev, device]
    );
  };

  // Xác định loại thiết bị VHF/HF từ phần tử đầu
  const typeLabel =
    devices.length > 0
      ? devices[0].type === "VHF"
        ? "VHF"
        : devices[0].type === "HF"
        ? "HF"
        : devices[0].type || ""
      : "";

  return (
    <div className="container py-10">
      {/* Nút quay lại trang chủ */}
      <div className="flex justify-end mb-4">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Quay lại Trang chủ
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Danh sách thiết bị {typeLabel}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`border rounded-lg p-4 transition cursor-pointer bg-white ${
              selected.find((d) => d.id === device.id)
                ? "border-blue-600 shadow-lg"
                : ""
            }`}
          >
            <input
              type="checkbox"
              checked={!!selected.find((d) => d.id === device.id)}
              onChange={() => toggleDevice(device)}
              className="mb-2"
            />{" "}
            <Link to={`/devices/${device.id}`}>
              <img
                src={device.icon}
                alt={device.name}
                className="w-32 h-32 object-contain mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold text-center">
                {device.name}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {device.summary}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {/* Hiện bảng so sánh nếu đã chọn >= 2 thiết bị */}
      <CompareDevices devices={selected} />
    </div>
  );
};

export default DeviceList;
