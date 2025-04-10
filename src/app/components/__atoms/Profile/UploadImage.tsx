import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

export const UploadImage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully!");

    const downloadURL = await getDownloadURL(storageRef);
    console.log("File available at", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
