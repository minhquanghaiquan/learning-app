import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import devices from "./data";

// Hàm hiệu ứng slide left
const SlideLeft = (delay) => ({
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay, ease: "easeInOut" }
  }
});

const HFDevices = () => {
  // Lọc các thiết bị sóng ngắn (High Frequency)
  const hfDevices = devices.filter((d) => d.type === "HF");

  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <Link to="/devices?type=VHF">
          <h1 className="text-4xl font-bold text-left pb-10 cursor-pointer hover:text-blue-600">
            Máy thông tin sóng ngắn
          </h1>
        </Link>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {hfDevices.map((device) => (
            <Link to={`/devices/${device.id}`} key={device.id}>
              <motion.div
                variants={SlideLeft(device.delay || 0.2)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
              >
                <img src={device.icon} alt={device.title} className="w-24 h-24 object-contain" />
                <h1 className="text-lg font-semibold text-center px-3">
                  {device.title}
                </h1>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HFDevices;
