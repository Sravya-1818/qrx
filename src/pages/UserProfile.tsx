// src/pages/UserProfile.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4">Profile not found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{profile.name}</h1>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Blood Group:</strong> {profile.blood_group}</p>
      <p><strong>Medical Conditions:</strong> {profile.conditions}</p>
      <p><strong>Allergies:</strong> {profile.allergies}</p>
      <p><strong>Emergency Contact:</strong> {profile.emergency_contact}</p>
      {profile.reports_url && (
        <p>
          <strong>Reports:</strong>{" "}
          <a href={profile.reports_url} target="_blank" className="text-blue-600 underline">View Report</a>
        </p>
      )}
    </div>
  );
};

export default UserProfile;
