import { useState } from "react";

export default function VideoGen() {
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const generateVideo = () => {
    setVideo("/demo-video.mp4");
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages([...e.target.files!])}
        className="mb-4"
      />

      <button onClick={generateVideo} className="w-full bg-blue-500 p-3 rounded-xl">
        🎬 Create Cinematic Video
      </button>

      {video && (
        <video controls src={video} className="w-full mt-4 rounded-xl" />
      )}
    </div>
  );
}
