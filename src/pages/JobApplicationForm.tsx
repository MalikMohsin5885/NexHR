import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useParams } from 'react-router-dom';

const JobApplicationForm = () => {
    const { jobId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        dob: '',
        education: '',
        experience: '',
        resume: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Required fields validation
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.education.trim()) newErrors.education = 'Education details are required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience details are required';
        if (!formData.resume) newErrors.resume = 'Resume is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // DOB validation
        const dob = new Date(formData.dob);
        const today = new Date();
        if (dob > today) {
            newErrors.dob = 'Date of birth cannot be in the future';
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
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            // TODO: Replace with actual API call
            // await jobService.submitApplication(jobId, formDataToSend);
            
            toast({
                title: "Success",
                description: "Application submitted successfully",
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                gender: '',
                address: '',
                dob: '',
                education: '',
                experience: '',
                resume: null,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit application",
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                resume: file
            }));
            if (errors.resume) {
                setErrors(prev => ({
                    ...prev,
                    resume: ''
                }));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Job Application</h1>
                    <p className="mt-2 text-gray-600">Please fill out the form below to apply for the position</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                    </div>

                    <div>
                        <Label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
                        <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                    </div>

                    <div>
                        <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.address ? "border-red-500" : "border-gray-300"}`}
                            rows={3}
                            placeholder="Enter your full address"
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div>
                        <Label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</Label>
                        <Textarea
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.education ? "border-red-500" : "border-gray-300"}`}
                            rows={3}
                            placeholder="Enter your educational background"
                        />
                        {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                    </div>

                    <div>
                        <Label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</Label>
                        <Textarea
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm ${errors.experience ? "border-red-500" : "border-gray-300"}`}
                            rows={3}
                            placeholder="Enter your work experience"
                        />
                        {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                    </div>

                    <div>
                        <Label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume (PDF)</Label>
                        <Input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className={`mt-1 block w-full ${errors.resume ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#5C5470] hover:bg-[#352F44] text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C5470]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationForm;
