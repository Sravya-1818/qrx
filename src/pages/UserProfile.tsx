import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Heart,
  Phone,
  AlertTriangle,
  Calendar,
  Shield,
  FileText
} from 'lucide-react';

interface UserData {
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  emergencyContact: string;
  lastUpdated: string;
  reportsUrl?: string;
}

const UserProfile = () => {
  const { userId = '' } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error || !data) {
          console.error("Error fetching user profile:", error);
          setError(true);
        } else {
          setUserData({
            name: data.name ?? "Unknown",
            age: parseInt(data.age) || 0,
            bloodGroup: data.blood_group ?? "Unknown",
            allergies: data.allergies?.split(',').map((a: string) => a.trim()) ?? [],
            medicalConditions: data.conditions?.split(',').map((c: string) => c.trim()) ?? [],
            emergencyContact: data.emergency_contact ?? "Not Available",
            lastUpdated: new Date().toLocaleDateString(),
            reportsUrl: data.reports_url || "",
          });
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="text-center text-red-600 mt-10 text-xl font-semibold">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2 text-blue-700">
            <User className="w-7 h-7" /> {userData.name}
          </CardTitle>
          <p className="text-gray-500">Last updated on: {userData.lastUpdated}</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            Age: <span className="font-medium">{userData.age}</span>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-red-500" />
            Blood Group: <span className="font-medium">{userData.bloodGroup}</span>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Allergies:
            {userData.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2 ml-2">
                {userData.allergies.map((allergy, i) => (
                  <Badge key={i} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="ml-2 text-gray-600">None</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-green-600" />
            Medical Conditions:
            {userData.medicalConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2 ml-2">
                {userData.medicalConditions.map((cond, i) => (
                  <Badge key={i} variant="secondary">
                    {cond}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="ml-2 text-gray-600">None</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Phone className="w-5 h-5 text-blue-500" />
            Emergency Contact: <span className="font-medium">{userData.emergencyContact}</span>
          </div>

          {userData.reportsUrl && (
            <div className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-purple-600" />
              Medical Report:
              <a
                href={userData.reportsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline"
              >
                View Report
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
