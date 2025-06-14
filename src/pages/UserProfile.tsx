import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setError(error.message);
      else setProfile(data);
    };

    fetchProfile();
  }, [id]);

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">{profile.name}</h1>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Blood Group:</strong> {profile.blood_group}</p>
      <p><strong>Conditions:</strong> {profile.conditions}</p>
      <p><strong>Allergies:</strong> {profile.allergies}</p>
      <p><strong>Emergency Contact:</strong> {profile.emergency_contact}</p>
      {profile.reports_url && (
        <p><strong>Reports:</strong> <a href={profile.reports_url} target="_blank" className="text-blue-500">View Report</a></p>
      )}
    </div>
  );
};

export default UserProfile;
