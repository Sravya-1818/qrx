// --- src/pages/UserProfile.tsx ---
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Heart, Phone, AlertTriangle, Calendar, Shield } from 'lucide-react';
import { getUserData, UserData } from '@/services/userData';

const UserProfile = () => {
  const params = useParams();
  const userId = params.userId ?? '';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await getUserData(userId);
        if (data) {
          setUserData(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-semibold text-red-700">EMERGENCY USE ONLY</span>
            </div>
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className="text-center">
            <CardContent className="py-16">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
              <p className="text-gray-600">The requested health profile could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Emergency Alert */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 animate-fade-in">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <span className="font-semibold text-red-700">EMERGENCY USE ONLY</span>
          </div>
          <p className="text-red-600 text-sm mt-1">
            This profile contains critical health information for emergency responders.
          </p>
        </div>

        {/* Personal Information */}
        <Card className="mb-6 hover-scale">
          <CardHeader className="bg-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center text-blue-800">
              <User className="mr-2 h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-800">{userData.name}</p>
                <p className="text-gray-600">Age: {userData.age} years</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {userData.bloodGroup}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Blood Group</p>
                  <p className="text-red-600 font-bold">{userData.bloodGroup}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Info */}
        <Card className="mb-6 hover-scale">
          <CardHeader className="bg-red-50 rounded-t-lg">
            <CardTitle className="flex items-center text-red-800">
              <Heart className="mr-2 h-5 w-5" />
              Critical Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Allergies */}
            <div>
              <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Allergies
              </h4>
              {userData.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                      ⚠️ {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">No known allergies</p>
              )}
            </div>

            {/* Conditions */}
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">Medical Conditions</h4>
              {userData.medicalConditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800 border-orange-300">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">No known conditions</p>
              )}
            </div>

            {/* Medications */}
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Current Medications</h4>
              {userData.medications.length > 0 ? (
                <div className="space-y-1">
                  {userData.medications.map((medication, index) => (
                    <p key={index} className="text-gray-700 bg-blue-50 px-3 py-1 rounded">
                      💊 {medication}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">No current medications</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="mb-6 hover-scale">
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="flex items-center text-green-800">
              <Phone className="mr-2 h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-800">{userData.emergencyContact.name}</p>
              <p className="text-green-700">({userData.emergencyContact.relation})</p>
              <a href={`tel:${userData.emergencyContact.phone}`} className="text-2xl font-bold text-green-600 hover:text-green-800">
                📞 {userData.emergencyContact.phone}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">Powered by QRx – For Life's Emergencies</span>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              Last Updated: {userData.lastUpdated}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;