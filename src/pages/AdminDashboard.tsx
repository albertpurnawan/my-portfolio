
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import ExperienceAdmin from '../components/admin/ExperienceAdmin';
import ProfileAdmin from '../components/admin/ProfileAdmin';
import AboutAdmin from '../components/admin/AboutAdmin';
import DataTools from '../components/admin/DataTools';
import AdminLayout from '../components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Kelola konten portfolio Anda</p>
        </div>

        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <ProjectsAdmin />
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <ExperienceAdmin />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <ProfileAdmin />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <AboutAdmin />
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <DataTools />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
