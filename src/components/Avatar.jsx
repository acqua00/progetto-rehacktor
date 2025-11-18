import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";

export default function Avatar({ url, size = 150, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      const file = event.target.files?.[0];
      if (!file) throw new Error("Seleziona un file da caricare.");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload?.(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      
      {/* AVATAR CLICCABILE */}
      <label className="cursor-pointer group">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{ height: size, width: size, borderRadius: 12 }}
            className="shadow-md group-hover:opacity-75 transition"
          />
        ) : (
          <div
            className="bg-gray-800 rounded-xl"
            style={{ height: size, width: size }}
          />
        )}

        {/* INPUT FILE NASCOSTO */}
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {/* Info sul caricamento */}
      <p className="text-sm text-gray-400">
        {uploading ? "Caricamento..." : "Clicca l'avatar per cambiarlo"}
      </p>

    </div>
  );
}
