import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className=" text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700">US</span>
        </p>
      </div >
      <div className=" my-10 flex flex-col md:flex-row gap-12  justify-center mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />
        <div>
          <div className=" flex flex-col justify-center items-start gap-6 mb-7 ">
            <b className="text-gray-600 font-semibold">Our OFFICE</b>
            <p>Mirpur-10, Dhaka, Bangladesh </p>
            <p className=" ">01728619254</p>

            <p>Email: shourovhasan001@gmail.com</p>
          </div>
          <div>
            <b className="text-gray-600 font-semibold">Careers at PRESCRIPTO</b>
            <p>Learn more about our teams and job openings.</p>
            <button className="border mt-6 border-gray-400 py-2 px-4 hover:bg-primary transition-all duration-200 ease-in-out rounded-lg">
            Explore Jobs
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
