import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <p className="text-center mt-10">Loading or user not found...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{profile.name}'s Medical Info</h1>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Age:</strong> {profile.age}</li>
        <li><strong>Blood Group:</strong> {profile.blood_group}</li>
        <li><strong>Conditions:</strong> {profile.condiitons}</li>
        <li><strong>Allergies:</strong> {profile.allergies}</li>
        <li><strong>Emergency Contact:</strong> {profile.emergency_contact}</li>
        {profile.reports_url && (
          <li><strong>Reports:</strong> <a href={profile.reports_url} target="_blank" className="text-blue-600 underline">View Report</a></li>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
