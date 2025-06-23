import React from "react";
import BannerPng from "../../assets/hoctap2.jpg";
import { motion } from "framer-motion";

const FeedbackSection = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug">
              Đóng góp về phần mềm
            </h1>
            <p className="text-dark2">
              Cải thiện phần mềm nhằm nâng cao trực quan, năng lực đào tạo
            </p>
            <a
              href="#"
              className="primary-btn !mt-8"
            >
              Ý kiến 
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt=""
            className="w-[600px] md:max-w-[700px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
