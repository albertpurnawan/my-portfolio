
import { useState } from 'react';
import Navigation from '../components/Navigation';
import ProfileSection from '../components/ProfileSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';  
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-dark">
      <Navigation />
      <ProfileSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
