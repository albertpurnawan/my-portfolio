
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfileStore } from '../../stores/profileStore';

const ProfileAdmin = () => {
  const { profile, updateProfile } = useProfileStore();
  const [formData, setFormData] = useState({
    name: profile.name || 'Jonathan Albert Purnawan',
    location: profile.location || 'Jakarta, Indonesia',
    description: profile.description || 'Software Engineer passionate about creating innovative web solutions.',
    email: profile.email || 'albertpurnawan1@gmail.com',
    github: profile.github || 'https://github.com/albertpurnawan?tab=repositories',
    linkedin: profile.linkedin || 'https://www.linkedin.com/in/albertpurnawan/',
    profileImage: profile.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Profile berhasil diupdate!');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Kelola Profile</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="profileImage">URL Foto Profile</Label>
              <Input
                id="profileImage"
                value={formData.profileImage}
                onChange={(e) => handleChange('profileImage', e.target.value)}
                placeholder="https://example.com/photo.jpg"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="github">URL GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="https://github.com/albertpurnawan?tab=repositories"
                />
              </div>

              <div>
                <Label htmlFor="linkedin">URL LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="https://www.linkedin.com/in/albertpurnawan/"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit">
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAdmin;
