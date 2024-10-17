import axios from "axios";

export const apiUploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  try {
    // 1. Create form data
    const uploadFile = new FormData();
    uploadFile.append("file", file);
    uploadFile.append("upload_preset", "edumaster1");
    // uploadFile.append("secure", "true");

    const response = await axios.post<{ secure_url: string }>(
      "https://api.cloudinary.com/v1_1/dz2dv8lk4/upload",
      uploadFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { data } = response;
    console.log("data url", data.secure_url);

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};
