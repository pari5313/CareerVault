import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const [gradientStyle, setGradientStyle] = useState({});
    const [shineStyle, setShineStyle] = useState({});

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((clientX - left) / width) * 100; // Percentage of the mouse's x position
        const y = ((clientY - top) / height) * 100; // Percentage of the mouse's y position

        // Use a very light soothing version of the shade #5A3F89
        setGradientStyle({
            background: `radial-gradient(circle at ${x}% ${y}%, rgba(90, 63, 137, 0.2), rgba(90, 63, 137, 0) 70%)`
        });

        setShineStyle({
            background: `radial-gradient(circle at ${x}% ${y}%, rgba(90, 63, 137, 0.1), transparent 70%)`
        });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setGradientStyle({});
        setShineStyle({});
    };

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative p-5 rounded-md border border-gray-100 cursor-pointer overflow-hidden transition-transform duration-300 ${hovered ? 'transform scale-105 shadow-2xl' : ''}`}
        >
            {/* Glowing Boundary */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 rounded-md ${hovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    ...shineStyle,
                    filter: 'blur(20px)',
                    zIndex: -1,
                    pointerEvents: 'none', // Prevent interference with mouse events
                }}
            />

            {/* Gradient Effect */}
            <div
                className={`absolute inset-0 transition-all duration-300 rounded-md ${hovered ? 'opacity-100' : 'opacity-0'}`}
                style={gradientStyle}
            />

            {/* Card Content */}
            <div className='relative z-10'>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div className='relative z-10'>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='relative z-10 flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
