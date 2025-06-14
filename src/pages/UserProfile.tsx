import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        setErrorMsg("Profile not found or you don’t have access.");
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (errorMsg) return <p className="text-center mt-10 text-red-600">{errorMsg}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">User Medical Profile</h1>
      <div className="space-y-3 text-gray-700">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Blood Group:</strong> {profile.blood_group}</p>
        <p><strong>Medical Conditions:</strong> {profile.condiitons}</p>
        <p><strong>Allergies:</strong> {profile.allergies}</p>
        <p><strong>Emergency Contact:</strong> {profile.emergency_contact}</p>
        {profile.reports_url && (
          <p>
            <strong>Reports:</strong> <a href={profile.reports_url} target="_blank" className="text-blue-600 underline">View Report</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
