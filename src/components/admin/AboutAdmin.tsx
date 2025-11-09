import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAboutStore } from '@/stores/aboutStore';
import { useEffect } from 'react';
import { adminHeaders } from '@/lib/api';

const AboutAdmin = () => {
  const { skills, stats, education, updateSkills, updateStats, updateEducation } = useAboutStore();
  const [skillsData, setSkillsData] = useState(skills);
  const [statsData, setStatsData] = useState(stats);
  const [educationData, setEducationData] = useState(education);

  const saveAll = async () => {
    await fetch('/api/about', { method: 'PUT', headers: adminHeaders(), body: JSON.stringify({ skills: skillsData, stats: statsData, education: educationData }) });
    const res = await fetch('/api/about');
    const data = await res.json();
    updateSkills(data.skills || []);
    updateStats(data.stats || []);
    updateEducation(data.education || []);
    alert('About content updated');
  };

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/about');
      const data = await res.json();
      setSkillsData(data.skills || []);
      setStatsData(data.stats || []);
      setEducationData(data.education || []);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Kelola About</h2>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillsData.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Title</Label>
                <Input value={s.title} onChange={(e) => {
                  const v = e.target.value; const arr = [...skillsData]; arr[i].title = v; setSkillsData(arr);
                }} />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea value={s.description} onChange={(e) => {
                  const v = e.target.value; const arr = [...skillsData]; arr[i].description = v; setSkillsData(arr);
                }} />
              </div>
              <div>
                <Label>Icon (nama lucide)</Label>
                <Input value={s.icon || ''} onChange={(e) => {
                  const v = e.target.value; const arr = [...skillsData]; arr[i].icon = v; setSkillsData(arr);
                }} placeholder="Code, Database, Globe, Smartphone" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {statsData.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Number</Label>
                <Input value={s.number} onChange={(e) => {
                  const v = e.target.value; const arr = [...statsData]; arr[i].number = v; setStatsData(arr);
                }} />
              </div>
              <div>
                <Label>Label</Label>
                <Input value={s.label} onChange={(e) => {
                  const v = e.target.value; const arr = [...statsData]; arr[i].label = v; setStatsData(arr);
                }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationData.map((e, i) => (
            <div key={i} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input value={e.degree} onChange={(ev) => {
                    const v = ev.target.value; const arr = [...educationData]; arr[i].degree = v; setEducationData(arr);
                  }} />
                </div>
                <div>
                  <Label>School</Label>
                  <Input value={e.school} onChange={(ev) => {
                    const v = ev.target.value; const arr = [...educationData]; arr[i].school = v; setEducationData(arr);
                  }} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Period</Label>
                  <Input value={e.period} onChange={(ev) => {
                    const v = ev.target.value; const arr = [...educationData]; arr[i].period = v; setEducationData(arr);
                  }} />
                </div>
                <div>
                  <Label>GPA/Notes</Label>
                  <Textarea value={e.gpa} onChange={(ev) => {
                    const v = ev.target.value; const arr = [...educationData]; arr[i].gpa = v; setEducationData(arr);
                  }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveAll}>Simpan Perubahan</Button>
      </div>
    </div>
  );
};

export default AboutAdmin;
