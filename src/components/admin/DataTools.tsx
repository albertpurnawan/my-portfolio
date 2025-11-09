import { useProjectStore } from '@/stores/projectStore';
import { useExperienceStore } from '@/stores/experienceStore';
import { useProfileStore } from '@/stores/profileStore';
import { useAboutStore } from '@/stores/aboutStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { adminHeaders } from '@/lib/api';

const DataTools = () => {
  const projectStore = useProjectStore();
  const experienceStore = useExperienceStore();
  const profileStore = useProfileStore();
  const aboutStore = useAboutStore();
  const [json, setJson] = useState('');

  const exportData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setJson(JSON.stringify(data, null, 2));
    } catch (e) {
      alert('Failed to export from backend');
    }
  };

  const importData = async () => {
    try {
      const data = JSON.parse(json);
      await fetch('/api/data', { method: 'POST', headers: adminHeaders(), body: JSON.stringify(data) });
      // Refresh stores from backend
      const [pRes, eRes, prRes, aRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/experiences'),
        fetch('/api/profile'),
        fetch('/api/about'),
      ]);
      projectStore.updateProjects(await pRes.json());
      experienceStore.updateExperiences(await eRes.json());
      profileStore.updateProfile(await prRes.json());
      const aboutData = await aRes.json();
      aboutStore.updateSkills(aboutData.skills || []);
      aboutStore.updateStats(aboutData.stats || []);
      aboutStore.updateEducation(aboutData.education || []);
      alert('Data imported to backend successfully');
    } catch (e) {
      alert('Invalid JSON or backend import failed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={exportData}>Export JSON</Button>
        <Button variant="outline" onClick={() => setJson('')}>Clear</Button>
        <Button variant="secondary" onClick={importData}>Import JSON</Button>
      </div>
      <Textarea rows={16} value={json} onChange={(e) => setJson(e.target.value)} placeholder="Paste JSON here or click Export" />
    </div>
  );
};

export default DataTools;
