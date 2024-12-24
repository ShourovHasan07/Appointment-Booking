import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className=" text-center text-2xl pt-10 text-gray-500">
        <p>
         
          About <span className="text-gray-700 font-medium">Us</span>
        </p>
      </div>

      <div className=" my-10 flex flex-col md:flex-row gap-12 ">
        <img
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 max-w-[360px] mx-auto"
          src={assets.about_image}
          alt=""
        />

        <div className=" mt-7  flex flex-col gap-12  my-13  mx-10 ">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <div className=" mb-10">
            <b className="text-gray-900 mb-10">Our Vision</b>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl my-4 ">
        <p>
          {" "}
          <span className=" text-gray-700  font-semibold">Why Choose Us</span>
        </p>
      </div>

      <div className="flex flex-col gap-4  md:flex-row mb-20 ">
        <div className="border border-gray-300 rounded-lg shadow-lg px-8 sm:px-12 md:px-16 py-8 sm:py-12 md:py-16 flex flex-col gap-6 text-[15px] bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg shadow-lg px-8 sm:px-12 md:px-16 py-8 sm:py-12 md:py-16 flex flex-col gap-6 text-[15px] bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg shadow-lg px-8 sm:px-12 md:px-16 py-8 sm:py-12 md:py-16 flex flex-col gap-6 text-[15px] bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
