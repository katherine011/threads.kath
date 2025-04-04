import { storage, db, auth } from "@/app/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

export const UploadProfPic = async (file: File) => {
  if (auth.currentUser) {
    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);

      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { photoURL }, { merge: true });

      return photoURL;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
};

export const getProfilePic = async () => {
  if (!auth.currentUser) return null;

  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().profilePic;
  }
  return null;
};

export const DeleteProfPic = async () => {
  if (!auth.currentUser) return;

  const userId = auth.currentUser.uid;
  const storageRef = ref(storage, `profile_pictures/${userId}`);

  await deleteObject(storageRef);

  const userDocRef = doc(db, "users", userId);
  await deleteDoc(userDocRef);
};
