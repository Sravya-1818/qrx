import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

const QRGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_group: "",
    condiitons: "",
    allergies: "",
    "exmergency contact": "",
    reports_url: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        navigate("/login");
        return;
      }

      const uid = authData.user.id;
      setUserId(uid);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();

      if (profile) {
        setFormData({
          name: profile.name || "",
          age: profile.age || "",
          blood_group: profile["blood group"] || "",
          condiitons: profile["condiitons"] || "",
          allergies: profile["allergies"] || "",
          "exmergency contact": profile["exmergency contact"] || "",
          reports_url: profile["reports_url"] || "",
        });
        setQrUrl(`https://qrx-one.vercel.app/user/${uid}`);
      }
    };

    fetchUserAndProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const profileData = {
      id: userId,
      ...formData,
    };

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    const { error } = existing
      ? await supabase.from("profiles").update(profileData).eq("id", userId)
      : await supabase.from("profiles").insert(profileData);

    if (error) {
      alert("Failed to save profile: " + error.message);
      return;
    }

    setQrUrl(`https://qrx-one.vercel.app/user/${userId}`);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {!qrUrl ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Get Your Free QR Badge</h2>

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="blood_group" placeholder="Blood Group" value={formData.blood_group} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="condiitons" placeholder="Medical Conditions" value={formData.condiitons} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="exmergency contact" placeholder="Emergency Contact" value={formData["exmergency contact"]} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="reports_url" placeholder="Reports URL" value={formData.reports_url} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate QR Code
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your Medical QR Badge</h2>
          <QRCode value={qrUrl} size={200} />
          <p className="mt-2 text-sm text-gray-500">{qrUrl}</p>
          <button
            onClick={() => navigate(`/user/${userId}`)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
