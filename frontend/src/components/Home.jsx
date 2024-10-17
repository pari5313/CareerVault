import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.imghippo.com/files/STz8D1729007221.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay applied starting from 120px above the image */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '100%', // Fill the entire height of the div
          pointerEvents: 'none', // Prevent interaction with this overlay
        }}
      >
        {/* Gradient to blend the background into white, with blur effect */}
        <div
          style={{
            height: '120px', // Height of the gradient blending area
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
            filter: 'blur(8px)', // Blur the blending area
            position: 'absolute',
            top: 'calc(100% - 120px)', // Start blending from 120px above the image
            left: '0',
            right: '0',
          }}
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
