import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const QRGenerator = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [reportsUrl, setReportsUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      age,
      blood_group: bloodGroup,
      condiitons: conditions,
      allergies,
      exmergency_contact: emergencyContact,
      reports_url: reportsUrl,
    });

    if (error) {
      alert("Failed to save profile: " + error.message);
      return;
    }

    const qrData = `https://qrx-one.vercel.app/user/${user.id}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    setQrUrl(qrApiUrl);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Get Your Free QR Badge</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full border p-2" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input className="w-full border p-2" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
        <input className="w-full border p-2" placeholder="Medical Conditions" value={conditions} onChange={(e) => setConditions(e.target.value)} />
        <input className="w-full border p-2" placeholder="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
        <input className="w-full border p-2" placeholder="Emergency Contact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
        <input className="w-full border p-2" placeholder="Reports URL (optional)" value={reportsUrl} onChange={(e) => setReportsUrl(e.target.value)} />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Generate QR
        </button>
      </form>

      {qrUrl && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-semibold">Your QR Code:</p>
          <img src={qrUrl} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
