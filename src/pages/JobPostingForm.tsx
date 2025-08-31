import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import DashboardLayout from '@/layouts/DashboardLayout';
import { jobService } from '@/services/JobService';

const JobPostingForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        job_type: 'FULL_TIME',
        min_salary: '',
        max_salary: '',
        application_deadline: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Required fields validation
        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.description.trim()) newErrors.description = 'Job description is required';
        if (!formData.requirements.trim()) newErrors.requirements = 'Job requirements are required';
        if (!formData.location.trim()) newErrors.location = 'Job location is required';
        if (!formData.application_deadline) newErrors.application_deadline = 'Application deadline is required';

        // Salary validation
        const minSalary = parseFloat(formData.min_salary);
        const maxSalary = parseFloat(formData.max_salary);

        if (isNaN(minSalary) || minSalary < 0) {
            newErrors.min_salary = 'Minimum salary must be a positive number';
        }
        if (isNaN(maxSalary) || maxSalary < 0) {
            newErrors.max_salary = 'Maximum salary must be a positive number';
        }
        if (!isNaN(minSalary) && !isNaN(maxSalary) && minSalary > maxSalary) {
            newErrors.min_salary = 'Minimum salary cannot be greater than maximum salary';
            newErrors.max_salary = 'Maximum salary cannot be less than minimum salary';
        }

        // Date validation
        const deadline = new Date(formData.application_deadline);
        const today = new Date();
        if (deadline < today) {
            newErrors.application_deadline = 'Application deadline must be a future date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please check the form for errors",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await jobService.createJob({
                ...formData,
                min_salary: parseFloat(formData.min_salary),
                max_salary: parseFloat(formData.max_salary),
            });
            toast({
                title: "Success",
                description: "Job posted successfully",
            });
            // Reset form
            setFormData({
                title: '',
                description: '',
                requirements: '',
                location: '',
                job_type: 'FULL_TIME',
                min_salary: '',
                max_salary: '',
                application_deadline: '',
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to post job",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h1>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                    <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            className={errors.requirements ? "border-red-500" : ""}
                        />
                        {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
                    </div>

                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={errors.location ? "border-red-500" : ""}
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>

                    <div>
                        <Label htmlFor="job_type">Job Type</Label>
                        <select
                            id="job_type"
                            name="job_type"
                            value={formData.job_type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="CONTRACT">Contract</option>
                            <option value="INTERNSHIP">Internship</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="min_salary">Minimum Salary</Label>
                            <Input
                                id="min_salary"
                                name="min_salary"
                                type="number"
                                value={formData.min_salary}
                                onChange={handleChange}
                                className={errors.min_salary ? "border-red-500" : ""}
                            />
                            {errors.min_salary && <p className="text-red-500 text-sm mt-1">{errors.min_salary}</p>}
                        </div>
                        <div>
                            <Label htmlFor="max_salary">Maximum Salary</Label>
                            <Input
                                id="max_salary"
                                name="max_salary"
                                type="number"
                                value={formData.max_salary}
                                onChange={handleChange}
                                className={errors.max_salary ? "border-red-500" : ""}
                            />
                            {errors.max_salary && <p className="text-red-500 text-sm mt-1">{errors.max_salary}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="application_deadline">Application Deadline</Label>
                        <Input
                            id="application_deadline"
                            name="application_deadline"
                            type="date"
                            value={formData.application_deadline}
                            onChange={handleChange}
                            className={errors.application_deadline ? "border-red-500" : ""}
                        />
                        {errors.application_deadline && <p className="text-red-500 text-sm mt-1">{errors.application_deadline}</p>}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#5C5470] hover:bg-[#352F44]"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Job'}
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default JobPostingForm; 