
import React, { useState } from 'react';
import { User, Settings, Ruler, Shield, Bell, Camera, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    measurements: {
      chest: '38',
      waist: '32',
      height: '5\'10"',
      weight: '150 lbs',
      shoulderWidth: '18',
      armLength: '24'
    },
    preferences: {
      notifications: true,
      dataSharing: false,
      autoSizeRecommendations: true,
      saveSearchHistory: true
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <p className="text-gray-600">{profile.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="gap-2"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span>January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outfits tried:</span>
                  <span>47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorites saved:</span>
                  <span>12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Measurements */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                Body Measurements
              </CardTitle>
              <p className="text-sm text-gray-600">
                Accurate measurements help us provide better size recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (inches)</Label>
                  <Input
                    id="chest"
                    value={profile.measurements.chest}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, chest: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (inches)</Label>
                  <Input
                    id="waist"
                    value={profile.measurements.waist}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={profile.measurements.height}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, height: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={profile.measurements.weight}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, weight: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder Width (inches)</Label>
                  <Input
                    id="shoulder"
                    value={profile.measurements.shoulderWidth}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, shoulderWidth: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arm">Arm Length (inches)</Label>
                  <Input
                    id="arm"
                    value={profile.measurements.armLength}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, armLength: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Preferences */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Preferences & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Receive updates about new arrivals and recommendations
                    </p>
                  </div>
                  <Switch
                    checked={profile.preferences.notifications}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, notifications: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Auto Size Recommendations</Label>
                    <p className="text-sm text-gray-600">
                      Automatically suggest sizes based on your measurements
                    </p>
                  </div>
                  <Switch
                    checked={profile.preferences.autoSizeRecommendations}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, autoSizeRecommendations: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Save Search History</Label>
                    <p className="text-sm text-gray-600">
                      Remember your searches to improve recommendations
                    </p>
                  </div>
                  <Switch
                    checked={profile.preferences.saveSearchHistory}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, saveSearchHistory: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Data Sharing</Label>
                    <p className="text-sm text-gray-600">
                      Share anonymized data to improve the platform
                    </p>
                  </div>
                  <Switch
                    checked={profile.preferences.dataSharing}
                    onCheckedChange={(checked) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, dataSharing: checked }
                    }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy & Security
                </h4>
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start gap-2">
                    <Shield className="w-4 h-4" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Shield className="w-4 h-4" />
                    Delete My Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
