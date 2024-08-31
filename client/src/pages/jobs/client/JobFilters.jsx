import React from 'react';

export default function JobFilters({ filterOptions, setFilterOptions }) {
    const handleFilter = (e) => {
        const { id, value } = e.target;

        setFilterOptions((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className='bg-white p-4 flex flex-row gap-2'>
            <div>
                <select
                    id='category'
                    value={filterOptions.category}
                    className='p-2 border rounded'
                    onChange={handleFilter}
                >
                    <option value=''>Select Category</option>
                    <option value='web-development'>Web Development</option>
                    <option value='mobile-development'>Mobile Development</option>
                    <option value='design'>Design</option>
                    <option value='writing'>Writing</option>
                    <option value='marketing'>Marketing</option>
                </select>
            </div>
            <div>
                <select
                    id='type'
                    value={filterOptions.type}
                    className='p-2 border rounded'
                    onChange={handleFilter}
                >
                    <option value=''>Select Type</option>
                    <option value='full-time'>Full Time</option>
                    <option value='part-time'>Part Time</option>
                    <option value='contract'>Contract</option>
                    <option value='freelance'>Freelance</option>
                </select>
            </div>
        </div>
    );
}
