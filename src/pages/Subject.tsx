import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type SubjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const Subject: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [isNavigating, setIsNavigating] = useState(false); // Track transition state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get<SubjectType[]>(
          "https://trogon.info/interview/php/api/subjects.php"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Function to handle navigation with animation
  const handleNavigate = (id: number) => {
    setIsNavigating(true); 
    setTimeout(() => {
      navigate(`/module/${id}`); 
    }, 1000); 
  };

  return (
    <motion.div
      className="min-h-screen bg-[#7714a8] sm:p-2 md:p-0"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <header className="p-4 bg-[#7714a8] fixed z-100 shadow-md w-full">
        <h1 className="text-white text-2xl font-medium px-5 text-left">
          Modules
        </h1>
      </header>

      <div className="flex flex-col justify-center items-center pt-24">
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3 md:w-[580px] w-[300px] text-black font-semibold mb-5">
          <p>
            Current course:<br /> Course Name
          </p>
          <button className="px-7 py-2 rounded-full bg-[#7714a8] text-white">
            Browse Other Course
          </button>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {/* Animated Vertical Line */}
          <motion.div
            className="absolute lg:left-[470px] left-6 md:left-24 top-0 bottom-8 w-0.5 bg-white"
            initial={{ height: 0 }}
            animate={{ height: "95%" }}
            transition={{ duration: 4.0, ease: "easeInOut" }}
          />

          <div className="space-y-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                className="flex items-start gap-4 cursor-pointer"
                onClick={() => handleNavigate(subject.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }} // Exit animation before navigation
                transition={{ duration: 1.8, delay: index * 0.5 }}
                
              >
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border-4 border-[#ac5cd4b9]"
                  animate={isNavigating ? { opacity: 0 } : { opacity: 1 }} // Fade-out effect
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-black text-xl font-bold">{subject.id}</span>
                </motion.div>

                <motion.div
                  className="flex-1 rounded-xl p-4 pr-2 hover:bg-[#ac5cd4b9] transition-colors"
                  animate={isNavigating ? { opacity: 0 } : { opacity: 1 }} // Fade-out on click
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <div className="space-y-1">
                      <h3 className="text-white">{subject.title}</h3>
                      <p className="text-yellow-300 text-sm">{subject.description}</p>
                    </div>
                    <motion.div  transition={{ duration: 0.3 }}>
                      <IoIosArrowForward className="text-2xl text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="wave w-full h-72"></div>
    </motion.div>
  );
};

export default Subject;
