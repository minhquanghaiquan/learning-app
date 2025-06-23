import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import Device3DViewer from "./Device3DViewer";
// import Device3DAssembly from "./Device3DAssembly";
import AssemblyScene from "./AssemblyScene";
import devices from "./data";

// Tabs
const SectionTab = ({ tabs, current, setCurrent }) => (
  <div className="flex gap-2 mb-6 border-b overflow-x-auto">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        onClick={() => setCurrent(i)}
        className={`px-4 py-2 rounded-t-lg font-semibold whitespace-nowrap transition
          ${current === i ? "bg-blue-100 text-blue-700 shadow" : "text-gray-500 hover:text-blue-600"}
        `}
      >{tab}</button>
    ))}
  </div>
);

// Gallery
const DeviceGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);
  if (!images?.length) return null;
  return (
    <div className="mb-6 flex flex-col items-center">
      <img
        src={images[current]}
        alt={`Hình ${current + 1}`}
        className="rounded-xl shadow-lg w-full max-w-xl h-72 object-contain mb-2 bg-white"
      />
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`thumb${idx}`}
            className={`w-16 h-12 rounded cursor-pointer border-2 transition
              ${idx === current ? "border-blue-500" : "border-transparent"}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const DeviceDetail = () => {
  const { id } = useParams();
  const device = devices.find((d) => d.id === id);
  const [tab, setTab] = useState(0);

  if (!device) return <div className="text-red-600 text-center p-10">Không tìm thấy thiết bị!</div>;
  const d = device.details;

  const tabNames = [
    "Tổng quan", "Thông số kỹ thuật", "Tính năng", "Cấu tạo & Phụ kiện", "Bảo trì", "Sơ đồ/Ảnh", "Mô hình 3D"
  ];

  return (
    <div className="container max-w-7xl mx-auto py-10 px-2 sm:px-6">
      <Link to="/devices?type=VHF" className="text-blue-600 hover:underline mb-8 block">&larr; Quay lại danh sách</Link>
      <Link to={`/quiz?deviceId=${device.id}`} className="btn">Trắc nghiệm thiết bị này</Link>


      {/* Header với ảnh to và tiêu đề */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
        <img
          src={device.icon}
          alt={device.title}
          className="w-80 h-72 rounded-xl shadow-xl object-contain bg-white hover:scale-105 transition"
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 text-center md:text-left">{device.title}</h1>
          <p className="text-gray-700 text-lg text-center md:text-left max-w-xl">{d.intro}</p>
        </div>
      </div>

      <SectionTab tabs={tabNames} current={tab} setCurrent={setTab} />

      <div className="rounded-2xl bg-white shadow-xl p-6 mb-8 min-h-[160px] w-full">
        {tab === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Giới thiệu thiết bị</h2>
            <p className="text-gray-800 whitespace-pre-line">{d.intro}</p>
          </div>
        )}
        {tab === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Thông số kỹ thuật</h2>
            <table className="min-w-full text-sm">
              <tbody>
                {d.specs?.map((s, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-1 font-semibold text-gray-700 pr-4">{s.label}</td>
                    <td className="py-1 text-gray-900">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Tính năng kỹ thuật</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {d.features?.map((f, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{f.title}:</strong>
                  <div className="ml-2 whitespace-pre-line">{f.content}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold mb-2 text-blue-700">Thành phần cấu tạo</h2>
              <ul className="list-disc ml-6 text-gray-800">
                {d.components?.map((c, idx) => <li key={idx}>{c}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-blue-700">Phụ kiện kèm theo</h2>
              <ul className="list-disc ml-6 text-gray-800">
                {d.accessories?.map((a, idx) => <li key={idx}>{a}</li>)}
              </ul>
            </div>
          </div>
        )}
        {tab === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Bảo trì - Bảo dưỡng</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {d.maintenance?.map((m, idx) => <li key={idx}>{m}</li>)}
            </ul>
          </div>
        )}
        {tab === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Hình ảnh/Sơ đồ thiết bị</h2>
            <DeviceGallery images={d.diagrams || device.images} />
          </div>
        )}

        {/* {tab === 6 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Tương tác mô hình 3D</h2>
            <Device3DAssembly parts={d.models3d || []} />
          </div>
        )} */}

        {tab === 6 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Tương tác mô hình 3D</h2>
            <AssemblyScene parts={d.models3d} />
          </div>
        )}

      </div>
    </div>
  );
};

export default DeviceDetail;
