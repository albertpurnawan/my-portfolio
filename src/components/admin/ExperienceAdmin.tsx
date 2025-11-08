
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExperienceStore } from '../../stores/experienceStore';
import ExperienceForm from './ExperienceForm';

const ExperienceAdmin = () => {
  const { experiences, deleteExperience } = useExperienceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const handleEdit = (experience: any) => {
    setEditingExperience(experience);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) {
      deleteExperience(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingExperience(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Kelola Experience</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={16} className="mr-2" />
          Tambah Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{experience.position}</CardTitle>
                  <p className="text-blue-600 font-medium">{experience.company}</p>
                  <p className="text-sm text-gray-600">{experience.period} · {experience.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(experience.id)}
                  >
                    <Trash2 size={14} className="mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{experience.description}</p>
              {experience.achievements && experience.achievements.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Pencapaian:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {experience.achievements.map((achievement: string, index: number) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <ExperienceForm
          experience={editingExperience}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default ExperienceAdmin;
