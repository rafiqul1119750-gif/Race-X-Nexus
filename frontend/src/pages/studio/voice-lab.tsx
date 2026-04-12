import { useState } from "react";

export default function VoiceLab() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {file && <p className="text-sm">{file.name}</p>}
    </div>
  );
}
