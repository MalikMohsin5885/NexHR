import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Upload, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import DashboardLayout from '@/layouts/DashboardLayout';
import { employeeService, Employee } from '@/services/employeeService';

const Employees = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await employeeService.getEmployees();
            setEmployees(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch employees",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "text/csv") {
            try {
                const result = await employeeService.importEmployees(file);
                if (result.success) {
                    toast({
                        title: "Success",
                        description: result.message,
                    });
                    // Refresh the employee list
                    fetchEmployees();
                } else {
                    toast({
                        title: "Import Failed",
                        description: result.message,
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Server Error",
                    description: "Could not connect to the server",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Invalid File",
                description: "Please select a valid CSV file",
                variant: "destructive",
            });
        }
        e.target.value = "";
    };

    const handleExport = () => {
        toast({
            title: "Export Employees",
            description: "Exporting employee data to CSV...",
        });
    };

    const filteredEmployees = employees.filter(employee =>
        employee.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phone.includes(searchQuery)
    );

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={handleExport}
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                        <Button
                            className="flex items-center gap-2 bg-[#5C5470] hover:bg-[#352F44]"
                            onClick={handleImport}
                        >
                            <Upload className="w-4 h-4" />
                            Import Employees
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full max-w-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredEmployees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        No employees found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{`${employee.fname} ${employee.lname}`}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.phone}</TableCell>
                                        <TableCell>{employee.company}</TableCell>
                                        <TableCell>{employee.branch}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                className="text-[#5C5470] hover:text-[#352F44]"
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Employees; 