import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const QRGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    condiitons: "",
    allergies: "",
    exmergencyContact: "",
    reportsUrl: ""
  });
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: formData.name,
      age: formData.age,
      "blood group": formData.bloodGroup,
      condiitons: formData.condiitons,
      allergies: formData.allergies,
      "exmergency contact": formData.exmergencyContact,
      reports_url: formData.reportsUrl,
    });

    if (error) {
      alert("Failed to save profile: " + error.message);
      setLoading(false);
      return;
    }

    const qrData = `https://qrx-one.vercel.app/user/${user.id}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;
    setQrUrl(qrApiUrl);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-6 mb-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Get Your Free QR Badge</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="name"
            placeholder="Full Name*"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="exmergencyContact"
            placeholder="Emergency Contact"
            value={formData.exmergencyContact}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          name="condiitons"
          placeholder="Medical Conditions"
          value={formData.condiitons}
          onChange={handleChange}
        />
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="url"
          name="reportsUrl"
          placeholder="Reports URL (optional)"
          value={formData.reportsUrl}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Generating QR..." : "Generate QR Code"}
        </button>
      </form>

      {qrUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold mb-2">Your QR Code</h2>
          <img src={qrUrl} alt="QR Code" className="mx-auto border border-gray-300 rounded-md shadow-md" />
          <p className="text-sm text-gray-600 mt-2">Scan this to access your medical profile</p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
