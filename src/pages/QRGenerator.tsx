import React, { useState } from "react";
import { supabase } from "@/lib/supabase"; // adjust path if needed
import QRCode from "react-qr-code";
import { useUser } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const QRGenerator = () => {
  const user = useUser();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_group: "",
    conditions: "",
    allergies: "",
    emergency_contact: "",
    reports_url: "",
  });

  const [qrUrl, setQrUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!user) {
      alert("Please login to generate a QR code.");
      return;
    }

    const profileData = {
      id: user.id,
      ...formData,
    };

    const { error } = await supabase.from("profiles").upsert(profileData);
    if (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save profile. Please check console.");
      return;
    }

    const url = `https://qrx-hl1sq91vo-sravya-valluris-projects.vercel.app`; // ✅ Replace with your Vercel domain
    setQrUrl(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate QR Health ID</h1>
      
      <div className="grid gap-4 mb-6">
        {[
          ["name", "Name"],
          ["age", "Age"],
          ["blood_group", "Blood Group"],
          ["conditions", "Health Conditions"],
          ["allergies", "Allergies"],
          ["emergency_contact", "Emergency Contact"],
          ["reports_url", "Reports URL"],
        ].map(([name, label]) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleGenerate} className="w-full bg-blue-600 text-white">
        Generate QR Code
      </Button>

      {qrUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Scan this QR</h2>
          <QRCode value={qrUrl} />
          <p className="mt-2 text-sm text-gray-600 break-all">{qrUrl}</p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
