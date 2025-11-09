
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjectStore } from '../../stores/projectStore';
import { adminHeaders } from '@/lib/api';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  date: string;
  github: string;
  demo: string;
  showGithub?: boolean;
  showDemo?: boolean;
  embedUrl?: string;
}

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
}

const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const { addProject, updateProject, updateProjects, projects } = useProjectStore();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    tech: '',
    date: new Date().getFullYear().toString(),
    github: '',
    demo: '',
    showGithub: true,
    showDemo: true,
    embedUrl: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        tech: project.tech.join(', '),
        date: project.date,
        github: project.github,
        demo: project.demo,
        showGithub: project.showGithub ?? true,
        showDemo: project.showDemo ?? true,
        embedUrl: project.embedUrl || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()),
    } as any;
    if (project) {
      await fetch(`/api/projects/${project.id}`, { method: 'PUT', headers: adminHeaders(), body: JSON.stringify(body) });
    } else {
      await fetch('/api/projects', { method: 'POST', headers: adminHeaders(), body: JSON.stringify(body) });
    }
    const res = await fetch('/api/projects');
    updateProjects(await res.json());
    onClose();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      handleChange('image', result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {project ? 'Edit Project' : 'Tambah Project'}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Judul Project</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-black placeholder-black"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className="text-black">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="text-black placeholder-black"
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Upload Gambar</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageFile(e.target.files?.[0])}
              className="text-black placeholder-black"
              required={!project && !formData.image}
            />
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-md border" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="tech">Teknologi (pisahkan dengan koma)</Label>
            <Input
              id="tech"
              value={formData.tech}
              onChange={(e) => handleChange('tech', e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="text-black placeholder-black"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Tahun</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="text-black placeholder-black"
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
                className="text-black placeholder-black"
              />
            </div>

            <div>
              <Label htmlFor="demo">URL Demo</Label>
              <Input
                id="demo"
                value={formData.demo}
                onChange={(e) => handleChange('demo', e.target.value)}
                placeholder="https://demo.com"
                className="text-black placeholder-black"
              />
            </div>
            <div>
              <Label htmlFor="embedUrl">URL Embed (optional)</Label>
              <Input
                id="embedUrl"
                value={formData.embedUrl}
                onChange={(e) => handleChange('embedUrl', e.target.value)}
                placeholder="https://your-app.example.com"
                className="text-black placeholder-black"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {project ? 'Update' : 'Tambah'} Project
            </Button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <Label>Tampilkan Link GitHub</Label>
              <p className="text-sm text-gray-500">Aktif/nonaktifkan tombol kode.</p>
            </div>
            <Switch
              checked={formData.showGithub}
              onCheckedChange={(val) => handleChange('showGithub', val)}
            />
          </div>
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <Label>Tampilkan Link Demo</Label>
              <p className="text-sm text-gray-500">Aktif/nonaktifkan tombol demo.</p>
            </div>
            <Switch
              checked={formData.showDemo}
              onCheckedChange={(val) => handleChange('showDemo', val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
