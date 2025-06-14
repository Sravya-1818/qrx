// --- src/pages/UserProfile.tsx ---
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Heart, Phone, AlertTriangle, Calendar, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface UserData {
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  emergencyContact: string;
  lastUpdated: string;
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

  // ... existing loading & error render blocks remain unchanged ...

  // ✅ Existing render block (after the `if (loading)` and `if (error)`) is already well-structured.
  // No change required there unless you want to show `reports_url` too.
};

export default UserProfile;
