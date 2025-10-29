'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import GlassButton from '@/components/btns/GlassButton';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function CreateContestPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        description: '',
        prizePool: '',
        deadline: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);
            setError(null);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // Validate required fields
            if (!form.title || !form.description || !form.prizePool || !form.deadline) {
                setError('Please fill in all required fields');
                setLoading(false);
                return;
            }

            if (!imageFile) {
                setError('Please upload a contest image');
                setLoading(false);
                return;
            }

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('prizePool', form.prizePool);
            formData.append('deadline', form.deadline);
            formData.append('image', imageFile);

            const response = await axios.post('/api/contests', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const contest = response.data;

            // Redirect to detail page
            router.push(`/contest/${contest.id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create contest');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8 text-white">Create New Contest</h1>

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Contest Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter contest title"
                        value={form.title}
                        className="w-full rounded-lg border border-primary/30 bg-background-dark/50 p-3 text-white placeholder-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Describe the contest theme and requirements"
                        value={form.description}
                        rows={4}
                        className="w-full rounded-lg border border-primary/30 bg-background-dark/50 p-3 text-white placeholder-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none"
                        onChange={handleChange}
                    />
                </div>

                {/* Prize Pool */}
                <div>
                    <label htmlFor="prizePool" className="block text-sm font-medium text-gray-300 mb-2">
                        Prize Pool <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="prizePool"
                        type="text"
                        name="prizePool"
                        placeholder="e.g. 10,000 $GLORY"
                        value={form.prizePool}
                        className="w-full rounded-lg border border-primary/30 bg-background-dark/50 p-3 text-white placeholder-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        onChange={handleChange}
                    />
                </div>

                {/* Contest Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                        Contest Image <span className="text-red-500">*</span>
                    </label>
                    
                    {!imagePreview ? (
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-background-dark/50 hover:bg-background-dark/70 transition-all"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    ) : (
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-primary/30">
                            <img
                                src={imagePreview}
                                alt="Contest preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Deadline */}
                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
                        Contest Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="deadline"
                        type="datetime-local"
                        name="deadline"
                        value={form.deadline}
                        className="w-full rounded-lg border border-primary/30 bg-background-dark/50 p-3 text-white placeholder-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        onChange={handleChange}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <GlassButton 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="w-full py-3 text-base font-bold"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Contest...
                            </span>
                        ) : (
                            'Create Contest'
                        )}
                    </GlassButton>
                </div>
            </div>
        </div>
    );
}