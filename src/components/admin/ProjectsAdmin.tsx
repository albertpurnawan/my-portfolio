
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProjectStore } from '../../stores/projectStore';
import ProjectForm from './ProjectForm';
import { adminHeaders } from '@/lib/api';

const ProjectsAdmin = () => {
  const { projects, deleteProject, updateProjects } = useProjectStore();
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/projects');
      updateProjects(await res.json());
    };
    load();
  }, [updateProjects]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus project ini?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: adminHeaders() });
    updateProjects(projects.filter(p => p.id !== id));
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Kelola Projects</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={16} className="mr-2" />
          Tambah Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <p className="text-sm text-black">{project.category}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 size={14} className="mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default ProjectsAdmin;
