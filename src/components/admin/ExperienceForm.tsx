
import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useExperienceStore } from '../../stores/experienceStore';
import { adminHeaders } from '@/lib/api';

interface ExperienceFormProps {
  experience?: any;
  onClose: () => void;
}

const ExperienceForm = ({ experience, onClose }: ExperienceFormProps) => {
  const { addExperience, updateExperience, updateExperiences } = useExperienceStore();
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: ['']
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        position: experience.position,
        company: experience.company,
        location: experience.location || '',
        period: experience.period,
        description: experience.description,
        achievements: experience.achievements || ['']
      });
    }
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      position: formData.position,
      company: formData.company,
      location: formData.location,
      period: formData.period,
      description: formData.description.split('\n').map(s => s.trim()).filter(Boolean),
      achievements: formData.achievements.filter(a => a.trim() !== ''),
    } as any;
    if (experience) {
      await fetch(`/api/experiences/${experience.id}`, { method: 'PUT', headers: adminHeaders(), body: JSON.stringify(body) });
    } else {
      await fetch('/api/experiences', { method: 'POST', headers: adminHeaders(), body: JSON.stringify(body) });
    }
    const res = await fetch('/api/experiences');
    updateExperiences(await res.json());
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {experience ? 'Edit Experience' : 'Tambah Experience'}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Posisi</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                required
              />
            </div>

          <div>
            <Label htmlFor="company">Perusahaan</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              required
            />
          </div>
          </div>

          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Jakarta, Indonesia"
              required
            />
          </div>

          <div>
            <Label htmlFor="period">Periode</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => handleChange('period', e.target.value)}
              placeholder="Jan 2020 - Dec 2022"
              required
            />
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
            <div className="flex items-center justify-between mb-2">
              <Label>Pencapaian</Label>
              <Button type="button" size="sm" onClick={addAchievement}>
                <Plus size={14} className="mr-1" />
                Tambah
              </Button>
            </div>
            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder="Pencapaian yang diraih..."
                  />
                  {formData.achievements.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removeAchievement(index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {experience ? 'Update' : 'Tambah'} Experience
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
