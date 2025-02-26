import axios from "axios";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { HiMiniChevronRight } from "react-icons/hi2";
import { MdOutlineCheck } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

type Props = {};

export default function VideoList({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [VideoList, setVideoList] = useState<any[]>([]);
 
  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return; // Ensure id exists before fetching

      try {
        const response = await axios.get(
          `https://trogon.info/interview/php/api/videos.php?module_id=${id}`
        );
        setVideoList(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchVideo();
  }, [id]);
  return (
    <div className="min-h-screen  bg p-2">
      <div className="p-5 flex lg:gap-[650px] md:gap-[280px] gap-22 ">
        <Link to={`/module/${id}`}>
          <BsArrowLeft className="h-6 w-6" />
        </Link>
        <img src="/emoji.png" alt="" className="w-12 mt-0" />
      </div>

      <div className="flex flex-col justify-center items-center ">
        <div className="flex justify-between items-center md:w-[80%] w-full flex-col ">
          <div className="self-start  font-semibold mb-10">
            <p>Level 1</p>
            {VideoList.length > 0 && (
              <p className="text-[24px]" key={VideoList[0].id}>
                {VideoList[0].title}
              </p>
            )}
          </div>
          {VideoList.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start w-full mb-10 gap-4 cursor-pointer relative"
              onClick={() => navigate(`/videoplay/${item.id}`)}
            >
              <div className="relative flex flex-col items-center">
                {index !== VideoList.length - 1 && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-1 h-full bg-[#9333ea]"></div>
                )}

                <div className="w-12 h-12 rounded-full bg-[#9333ea] border-4 border-[#c09fde] flex items-center justify-center shrink-0 relative z-10">
                  <MdOutlineCheck className="text-white text-lg" />
                </div>
              </div>

              {/* Content Wrapper */}
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="text-gray-700 font-semibold text-sm">{`Step ${
                    index + 1
                  }`}</div>
                  <div className="font-semibold md:text-xl text-black">
                    {item.title}
                  </div>
                </div>

                {/* Moved HiMiniChevronRight to the End */}
                <HiMiniChevronRight className="text-2xl text-gray-600" />
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate(`/videoplay/${id}`)}
            className=" w-full bg-[#9333ea] text-white py-4 rounded-lg text-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
