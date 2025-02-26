import axios from "axios";
import  { useEffect, useState } from "react";
import {  BiHelpCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

type Props = {};

export default function VideoPlay({}: Props) {
  const { id } = useParams();
  const [Video, setVideo] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return; // Ensure id exists before fetching

      try {
        const response = await axios.get(
          `https://trogon.info/interview/php/api/videos.php?module_id=${id}`
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  // Ensure we have a valid video object
  const videoById = Video.length > 0 ? Video[0] : null;

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&controls=0&fs=0&cc_load_policy=0&autohide=1&disablekb=1`
      : "";
  };

  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match
      ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&background=1&byline=0&title=0&portrait=0`
      : "";
  };

  let embedUrl = "";
  if (videoById) {
    if (videoById.video_type === "YouTube") {
      embedUrl = getYouTubeEmbedUrl(videoById.video_url);
    } else if (videoById.video_type === "Vimeo") {
      embedUrl = getVimeoEmbedUrl(videoById.video_url);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="p-5">
        <Link to={`/videolist/${id}`}>
          <BsArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className=" lg:w-[70%] w-full lg:h-[500px] h-[300px] bg-black">
          {embedUrl ? (
            <ReactPlayer
              url={embedUrl}
              width="100%"
              height="100%"
              controls // Enables progress bar & play/pause controls
              config={{
                youtube: {
                  playerVars: { showinfo: 1, controls: 1 }, // Enable controls (progress bar)
                },
                facebook: {
                  appId: "12345",
                },
              }}
            />
          ) : (
            <div className="p-5 text-white">Invalid video URL</div>
          )}
        </div>

        {videoById && (
          <div className="lg:w-[70%]  w-full md:p-10 p-2 flex flex-col gap-5 bg-white">
            <h1 className="text-3xl font-bold">{videoById.title}</h1>
            <p className="text-gray-600 text-justify">
              {videoById.description}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-4">
              <button className="flex items-center justify-center gap-2 bg-white rounded-xl lg:py-4 lg:px-6 px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow">
                <HiDownload className="h-5 w-5" />
                <span className="font-medium">Download</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white rounded-xl lg:py-4 lg:px-6 px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow">
                <BiHelpCircle className="h-5 w-5 bg-amber-500 rounded-full text-white" />
                <span className="font-medium">Doubts</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
