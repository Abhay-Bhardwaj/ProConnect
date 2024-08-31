import React from 'react'

export default function JobsCard({job}) {
    const {
        created_by,
        title,
        company,
        location,
        type,
        description,
        budget,
        createdAt,
        updatedAt,
        category,
        applicantCount
      } = job;
    
      return (
        <div className=" bg-white rounded-lg shadow-md p-2 mb-2 flex items-center gap-2 cursor-pointer">
            {/* Company Logo */}
            {company.logo ? (
                <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-12 h-12 object-contain rounded-full"
                />
            ) : (
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
                <p className="text-gray-500 text-sm text-center">No Logo</p>
                </div>
            )}
            
            {/* Job Details */}
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm font-medium text-gray-800">{company.name}</p>
                <p className="text-xs text-gray-600">{location}</p>
                <p className="text-xs text-gray-500">{type}</p>
            </div>

        </div>
      );
}
