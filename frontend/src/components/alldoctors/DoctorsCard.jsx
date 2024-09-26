import React from "react";
import { NavLink } from "react-router-dom";
import { FaHospital, FaVideo } from "react-icons/fa";
import hero from "/new_hero.png";
import langIcon from "/language.webp";
import { SkeletonLoading, useLoading } from "../../import-export/ImportExport";

const DoctorsCard = ({ doctor }) => {
  const loading = useLoading(1000); // Using the custom hook

  return (
    <section className="border border-text_grey/40 rounded-md shadow-lg py-1 px-1 bg-gray-300/20 transition duration-300 ease-in-out shadow-md transform hover:scale-105 hover:shadow-md ">
      
        <>
        <div className="flex gap-4 items-center">
        {/* Doctor's Avatar */}
        <img
          src={doctor.docAvatar || hero}
          alt="Doctor"
          className="w-20 h-20 object-cover rounded-full"
        />

        {/* Doctor's Details */}
        <div>
          <h2 className="font-semibold text-lg text-gray-800">
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>
          <h3 className="text-gray-600">
            {doctor.department?.name || "No Department"}
          </h3>
          <p className="text-gray-600">
            Experience: {doctor.experience || "N/A"}
          </p>
          <p className="text-gray-600">
            Qualifications: {doctor.qualifications?.join(", ") || "N/A"}
          </p>
        </div>
      </div>

             
                

          

          
          {/* Actions */}
          <div className="ctas grid grid-cols-1 md:grid-cols-2 gap-1">
            <NavLink to="/room" className="bg-dark_theme/95 hover:bg-dark_theme text-text px-4 py-4 rounded border-none font-medium text-sm tracking-tighter flex items-center justify-center md:justify-normal">
              <FaVideo className="mr-2 text-text size-4" />
              Book Digital Consult
            </NavLink>
            <NavLink className="bg-light_theme/85 hover:bg-light_theme text-dark_theme px-3 py-3 rounded border-none font-semibold text-md tracking-tighter flex items-center justify-center md:justify-normal">
              <FaHospital className="mr-2 text-dark_theme size-5" />
              Book Hospital Visit
            </NavLink>
          </div>
        </>
    
    </section>
  );
};

export default DoctorsCard;
