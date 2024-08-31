
import { apiClient } from "@/lib/api-client";
import { CREATE_JOB } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
export default function JobCreate() {
  const [formDetails, setFormDetails] = useState({
    title: '',
    budget: '',
    company: '',
    description: '',
    skills: '',
    experience: '',
    location: '',
    deadline: '',
    type: 'full-time',
    category: 'web-development',
    });
  const [loading,setLoading]=useState(false);



  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const jobsDate=async()=>{
      try{
        const response=await apiClient.post(CREATE_JOB,formDetails);
        if(response.status===200){
          console.log('Job created successfully:',response.data);
          toast.success('Job created successfully');
          setFormDetails({
            title: '',
            budget: '',
            company: '',
            description: '',
            skills: '',
            experience: '',
            location: '',
            deadline: '',
            type: 'full-time',
            category: 'web-development',
            })
        }
      }
      catch(error){
        console.log('Error creating job:',error);
      }
      setLoading(false);
    }

    jobsDate();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a Job</h1>
        <form  className="space-y-4" onSubmit={handleSubmit}>
          {/* Job Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Job Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-gray-600">Title/Job Position</label>
                <input value={formDetails.title} type="text" id="title" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., Software Engineer" required />
              </div>
              <div>
                <label htmlFor="budget" className="block text-gray-600">Budget (Currency $) </label>
                <input value={formDetails.budget} type="text" id="budget" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., 5000" required min='0' />
              </div>
              <div>
                <label htmlFor="title" className="block text-gray-600">Company</label>
                <input value={formDetails.company} type="text" id="company" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., Google, Microsoft" required />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-gray-600">Description</label>
            <textarea value={formDetails.description} id="description" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="Provide a detailed job description..." rows="4" required />
           
          </div>

          {/* Job Requirements */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Job Requirements</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="skills" className="block text-gray-600">Skills</label>
                <input value={formDetails.skills} type="text" id="skills" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., JavaScript, React" required />
              </div>
              <div>
                <label htmlFor="experience" className="block text-gray-600">Experience</label>
                <input value={formDetails.experience} type="text" id="experience" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., 2-5 years" required />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Additional Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="location" className="block text-gray-600">Location</label>
                <input value={formDetails.location} type="text" id="location" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="e.g., Remote, New York" required />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-gray-600">Deadline</label>
                <input value={formDetails.deadline} type="date" id="deadline" onChange={handleChange} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500" required />
              </div>
            </div>
          </div>

          {/* Job Type and Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="type" className="block text-gray-600">Type</label>
              <select id="type" onChange={handleChange} value={formDetails.type} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500">
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-600">Category</label>
              <select id="category" onChange={handleChange} value={formDetails.category} className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500">
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="design">Design</option>
                <option value="writing">Writing</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="customer-support">Customer Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button disabled={loading? true: false} type="submit" className="w-full py-3 bg-input text-white rounded-md hover:bg-foreground transition-all duration-500 flex justify-center">{loading? <Loader2 className="animate-spin"/>:"Create Job"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
