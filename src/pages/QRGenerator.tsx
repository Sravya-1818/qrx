// src/pages/QRGenerator.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import QRCode from "qrcode.react";

const QRGenerator = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [reportsUrl, setReportsUrl] = useState("");
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMsg("User not logged in.");
      setLoading(false);
      return;
    }

    const profileData = {
      id: user.id,
      name,
      age,
      blood_group: bloodGroup,
      conditions,
      allergies,
      emergency_contact: emergencyContact,
      reports_url: reportsUrl,
    };

    const { error } = await supabase.from("profiles").upsert(profileData);

    if (error) {
      setErrorMsg(`Failed to save profile: ${error.message}`);
      setLoading(false);
      return;
    }

    setQrData(`https://qrx-one.vercel.app/user/${user.id}`);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Generate Your QR Badge</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input-style" required />
        <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input-style" />
        <input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} placeholder="Blood Group" className="input-style" />
        <input value={conditions} onChange={(e) => setConditions(e.target.value)} placeholder="Medical Conditions" className="input-style" />
        <input value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Allergies" className="input-style" />
        <input value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} placeholder="Emergency Contact" className="input-style" />
        <input value={reportsUrl} onChange={(e) => setReportsUrl(e.target.value)} placeholder="Reports URL (optional)" className="input-style md:col-span-2" />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>

      {errorMsg && (
        <p className="mt-4 text-red-600 text-center font-medium">{errorMsg}</p>
      )}

      {qrData && (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Your QR Code</h2>
          <div className="inline-block bg-gray-100 p-4 rounded shadow">
            <QRCode value={qrData} size={200} />
          </div>
          <p className="mt-4 text-blue-600 font-medium break-all">{qrData}</p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
