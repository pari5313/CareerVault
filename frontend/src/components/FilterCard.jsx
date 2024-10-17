import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Data Science",
            "Graphic Designer",
            "FullStack Developer",
            "Mobile App Developer",
            "Software Engineer",
            "DevOps Engineer",
            "Machine Learning Engineer",
            "Cybersecurity Analyst",
            "Content Writer",
            "Web Developer"
        ]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

   
    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedFilter');
        if (savedFilter) {
            setSelectedValue(savedFilter);
        }
    }, []);

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    const resetFilters = () => {
        setSelectedValue(''); 
        localStorage.removeItem('selectedFilter'); 
        dispatch(setSearchedQuery('')); 
       
    };

    
    useEffect(() => {
        resetFilters(); 
    }, [location]);

    
    useEffect(() => {
        if (selectedValue) {
            localStorage.setItem('selectedFilter', selectedValue);
        }
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
            <button
                className='mt-3 px-4 py-2 bg-blue-500 text-white rounded-md'
                onClick={resetFilters}
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterCard;
