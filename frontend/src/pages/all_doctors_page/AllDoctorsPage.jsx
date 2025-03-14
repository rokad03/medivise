import React, { useState, useEffect } from "react";
import { DoctorsCard } from "../../import-export/ImportExport";
import axios from "axios";
import doctorsData from "./doctors.json"

function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Directly use the imported JSON data
    setDoctors(doctorsData);
  }, []);


  return (
    <div className="w-full">
      <section className="my-20 h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-between px-3 md:px-6 lg:px-6 py-2">
        {/* Search doctors component */}
        {/* code here */}

        {/* Doctors components */}
        {doctors.map((doctor) => (
          <DoctorsCard key={doctor._id} doctor={doctor} />
        ))}
      </section>
    </div>
  );
}

export default AllDoctorsPage;
