import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type ProjectForm = {
    title: string;
    url: string;
    description: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Create',
        href: '/projects/create',
    },
];

export default function CreateProject() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ProjectForm>>({
        title: '',
        url: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-black">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Add a New Project</h1>
                        <p className="mt-2 text-gray-400">Share an amazing project with our community.</p>
                    </div>

                    <div className="rounded-xl bg-gray-900 p-8 shadow-md border border-gray-800">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-gray-300">Project Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="rounded-md border-gray-800 bg-gray-900 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500"
                                    placeholder="Enter project title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url" className="text-gray-300">Project URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="rounded-md border-gray-800 bg-gray-900 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500"
                                    placeholder="https://example.com"
                                />
                                <InputError message={errors.url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-300">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="rounded-md border-gray-800 bg-gray-900 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500 min-h-[120px]"
                                    placeholder="Describe the project (optional)"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-500 px-5 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-600 disabled:opacity-70"
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Add Project
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
