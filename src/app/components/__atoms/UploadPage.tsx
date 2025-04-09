"use client";
import { useEffect, useState } from "react";
import { auth, storage, db } from "@/app/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  // Get current user UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUid(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const storageRef = ref(storage, `profile_pics/${currentUid}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);

      // Save image URL to Firestore under the user's profile
      if (currentUid) {
        const userDocRef = doc(db, "users", currentUid);
        await updateDoc(userDocRef, { profileImage: imageUrl });

        setImageSrc(imageUrl);
        console.log("Image URL: ", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <h1>Upload Profile Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>

      {imageSrc && (
        <img src={imageSrc} alt="Uploaded Image" width={100} height={100} />
      )}
    </div>
  );
}
