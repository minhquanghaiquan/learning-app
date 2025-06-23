import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../assets/gv.jpg";
import { motion } from "framer-motion";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ContactInfo = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="relative container min-h-[450px] pt-16 md:pt-24 pb-12"
      >
        {/* ✅ lớp phủ đen trên toàn ảnh */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* ✅ nội dung nằm trên lớp phủ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10 text-center space-y-4 lg:max-w-[600px] mx-auto"
        >
          <h1 className="text-4xl font-bold text-white leading-snug">
            Khoa Thông tin - ra đa <br /> Bộ môn Thông tin
          </h1>
          <p className="text-white text-base">
            Quyết tâm nâng cao chất lượng đào tạo
          </p>
          <a
            href="#"
            className="primary-btn bg-yellow-400 text-white mt-6 inline-flex items-center gap-4 group"
          >
            Thông tin thêm
            <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200" />
          </a>
        </motion.div>
      </motion.div>
    </section>


  );
};

export default ContactInfo;
