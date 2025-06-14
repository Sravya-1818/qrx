
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, User, Heart, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserData, saveUserData, generateQRCodeUrl } from '@/services/userData';
import { useToast } from "@/hooks/use-toast";

const QRGenerator = () => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    age: 0,
    bloodGroup: '',
    allergies: [],
    medicalConditions: [],
    medications: [],
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });
  const [generatedUserId, setGeneratedUserId] = useState<string>('');
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('emergencyContact.')) {
      const contactField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact!,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayInput = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Generate userId
    const userId = `${formData.name?.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;

    // Save data
    await saveUserData(userId, formData as UserData);

    // Generate QR code from that ID
    setGeneratedUserId(userId);
    setQRCodeUrl(generateQRCodeUrl(userId));

    toast({
      title: "QR Code Generated Successfully!",
      description: "Your emergency health profile is ready.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to generate QR code. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QRx-${formData.name || 'Emergency'}-Health-ID.png`;
    link.click();
  };

  if (generatedUserId && qrCodeUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">
                🎉 Your QR Health ID is Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-6 rounded-lg inline-block shadow-lg">
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
                <p className="text-sm text-gray-600">Scan this code for emergency info</p>
              </div>

              <div className="space-y-4">
                <Button onClick={downloadQR} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
                
                <div className="text-sm text-gray-600">
                  <p>Your profile URL: <Link to={`/user/${generatedUserId}`} className="text-blue-600 hover:underline">
                    /user/{generatedUserId}
                  </Link></p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🛡 This is a secure emergency health profile, designed for rescue workers. 
                    No sensitive history is exposed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Your QR Health ID</CardTitle>
            <p className="text-center text-gray-600">Fill in your emergency health information</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group *</Label>
                    <Input
                      id="bloodGroup"
                      required
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      placeholder="e.g., O+, A-, B+, AB-"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medical Info */}
              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-600" />
                    Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                    <Textarea
                      id="allergies"
                      onChange={(e) => handleArrayInput('allergies', e.target.value)}
                      placeholder="e.g., Penicillin, Shellfish, Peanuts"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions">Medical Conditions (comma-separated)</Label>
                    <Textarea
                      id="conditions"
                      onChange={(e) => handleArrayInput('medicalConditions', e.target.value)}
                      placeholder="e.g., Diabetes, Hypertension, Asthma"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications (comma-separated)</Label>
                    <Textarea
                      id="medications"
                      onChange={(e) => handleArrayInput('medications', e.target.value)}
                      placeholder="e.g., Metformin 500mg, Lisinopril 10mg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-green-600" />
                    Emergency Contact *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.emergencyContact?.name}
                      onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      required
                      value={formData.emergencyContact?.phone}
                      onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactRelation">Relationship *</Label>
                    <Input
                      id="contactRelation"
                      required
                      value={formData.emergencyContact?.relation}
                      onChange={(e) => handleInputChange('emergencyContact.relation', e.target.value)}
                      placeholder="e.g., Spouse, Son, Daughter"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <Shield className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Your information will be securely stored and only accessible via the QR code for emergency purposes.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate QR Health ID'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;
