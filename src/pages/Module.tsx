import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BiChevronLeftCircle } from "react-icons/bi";

type Props = {};

export default function Module({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subjectID, setSubjectID] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `https://trogon.info/interview/php/api/modules.php?subject_id=${id}`
        );
        setSubjectID(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#5a0e82] relative overflow-hidden mx-auto">
      <header className="p-4 flex items-center">
        <div className="p-4">
          <Link to={"/"}>
            <button className="p-2">
              <BiChevronLeftCircle  className="h-6 w-6 text-white" />
            </button>
          </Link>
        </div>
      </header>

      <div className="px-4 py-2 max-w-md mx-auto relative mb-20">
        {subjectID.map((chapter, index) => (
          <div className="relative flex flex-col gap-10 items-center text-center mb-10" key={index}>
            
            {/* Right Side Dot (First) */}
            <motion.h2
              className={`md:text-md font-semibold text-white/70 w-52 text-sm  absolute  ${
                index % 2 === 0 ? "right-0 md:mr-52" : "left-0 md:ml-52"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
            >
              {chapter.title}
            </motion.h2>

            {/* Curved Dotted Line (Second) */}
            {index !== subjectID.length - 1 && (
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className={`absolute top-full ${
                  index % 2 === 0 ? "md:left-6 left-0 -rotate-120" : "right-6 rotate-120"
                }`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.6 }}
              >
                <path
                  d="M10 150 Q60 40, 180 190"
                  stroke="yellow"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  fill="none"
                />
              </motion.svg>
            )}

            
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.6 }}
            >
              <div
                className={`bg-white rounded-full flex items-center justify-center ${
                  index % 2 === 0 ? "right-0 mr-36" : "left-0 ml-36"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-[#9333ea]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>

          </div>
        ))}
      </div>

      <div className="fixed flex justify-center bottom-6  py-5 w-full bg-white/20 backdrop-blur-lg text-white text-lg font-medium shadow-lg shadow-purple-900/20 transition duration-300">
        <button
          onClick={() => navigate(`/videolist/${id}`)}
          className="w-1/2 bg-white text-purple-700 py-4 rounded-full text-lg font-medium shadow-lg shadow-purple-900/20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
