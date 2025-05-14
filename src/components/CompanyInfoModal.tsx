import React, { useState, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import api from '@/lib/api';
import { useDispatch } from 'react-redux';
import { setCompanyInfo, setNeedsCompanyInfo, CompanyInfo } from '@/store/companySlice';
import { useNavigate } from 'react-router-dom';

interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyInfoErrors {
  name?: string;
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
}

const industryOptions = [
  { value: 'IT', label: 'IT/Software Development' },
  { value: 'Marketing', label: 'Marketing & Sales' },
  { value: 'Design', label: 'Design & Creative' },
  { value: 'Finance', label: 'Finance & Accounting' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Customer_Service', label: 'Customer Service' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Admin', label: 'Administrative' },
  { value: 'Architecture', label: 'Architecture/Interior Design' },
  { value: 'Construction', label: 'Construction/Civil Engineering' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Logistics', label: 'Logistics/Supply Chain' },
  { value: 'Manufacturing', label: 'Manufacturing/Production' },
  { value: 'Media', label: 'Media/Communications' },
  { value: 'NGO', label: 'NGO/Non-profit' },
  { value: 'Retail', label: 'Retail/Wholesale' },
  { value: 'Tourism', label: 'Tourism/Hospitality' },
  { value: 'Other', label: 'Other' },
];

const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<CompanyInfo>({
    name: '',
    industry: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<CompanyInfoErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: CompanyInfoErrors = {};
    if (!data.name.trim()) {
      newErrors.name = 'Company name cannot be empty';
    }
    if (!data.industry) {
      newErrors.industry = 'Please select an industry';
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email cannot be empty';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number cannot be empty';
    } else if (!/^\d{10,12}$/.test(data.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Sending company info data:', data);
      
      // Make the API request with the correct endpoint
      const response = await api.post('/auth/register-company/', data);
      
      console.log('Company registration response:', response);
      
      if (response.status === 200 || response.status === 201) {
        // Set the company info in Redux store immediately with the response data
        const companyData = response.data || data;
        dispatch(setCompanyInfo(companyData));
        
        // Explicitly set needsCompanyInfo to false to avoid redirect loop
        dispatch(setNeedsCompanyInfo(false));
        
        toast({
          title: "Success",
          description: "Company information saved successfully",
        });
        
        // Reset form and close modal
        setData({ name: '', industry: '', email: '', phone: '' });
        setErrors({});
        onClose();
        
        // Navigate to dashboard after successful submission - Putting this after all Redux updates
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Error saving company info:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
        
        // Check if there are field-specific errors from the API
        if (error.response.data && typeof error.response.data === 'object') {
          const serverErrors: CompanyInfoErrors = {};
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (key in data) {
              serverErrors[key] = Array.isArray(value) ? value[0] : String(value);
            }
          });
          
          if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
          }
        }
      }
      
      // Check for specific error response from the API
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Failed to save company information";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Company Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
              placeholder="Enter company name"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Industry Type */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry Type</Label>
            <select
              id="industry"
              name="industry"
              value={data.industry}
              onChange={handleChange}
              className={`w-full rounded-md border p-2 text-sm ${
                errors.industry ? 'border-red-500' : 'border-input'
              }`}
            >
              <option value="">Select industry...</option>
              {industryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-sm text-red-600">{errors.industry}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="company@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className={errors.phone ? 'border-red-500' : ''}
              placeholder="e.g., 03001234567"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyInfoModal; 