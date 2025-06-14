import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface UserData {
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  lastUpdated: string;
}

export const saveUserData = async (userId: string, data: UserData): Promise<string> => {
  await setDoc(doc(db, "profiles", userId), data);
  return userId;
};


export const getUserData = async (userId: string): Promise<UserData | null> => {
  const ref = doc(db, "profiles", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserData) : null;
};
export const generateQRCodeUrl = (userId: string): string => {
  const encodedData = encodeURIComponent(`http://localhost:5173/user/${userId}`);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=200x200`;
};

