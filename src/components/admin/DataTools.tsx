import { useProjectStore } from '@/stores/projectStore';
import { useExperienceStore } from '@/stores/experienceStore';
import { useProfileStore } from '@/stores/profileStore';
import { useAboutStore } from '@/stores/aboutStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const DataTools = () => {
  const projectStore = useProjectStore();
  const experienceStore = useExperienceStore();
  const profileStore = useProfileStore();
  const aboutStore = useAboutStore();
  const [json, setJson] = useState('');

  const exportData = () => {
    const data = {
      projects: projectStore.projects,
      experiences: experienceStore.experiences,
      profile: profileStore.profile,
      about: {
        skills: aboutStore.skills,
        stats: aboutStore.stats,
        education: aboutStore.education,
      },
    };
    setJson(JSON.stringify(data, null, 2));
  };

  const importData = () => {
    try {
      const data = JSON.parse(json);
      if (data.projects && Array.isArray(data.projects)) projectStore.updateProjects(data.projects);
      if (data.experiences && Array.isArray(data.experiences)) {
        experienceStore.updateExperiences(data.experiences);
      }
      if (data.profile && typeof data.profile === 'object') profileStore.updateProfile(data.profile);
      if (data.about) {
        if (Array.isArray(data.about.skills)) aboutStore.updateSkills(data.about.skills);
        if (Array.isArray(data.about.stats)) aboutStore.updateStats(data.about.stats);
        if (Array.isArray(data.about.education)) aboutStore.updateEducation(data.about.education);
      }
      alert('Data imported successfully');
    } catch (e) {
      alert('Invalid JSON');
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
