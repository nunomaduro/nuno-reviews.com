import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpCircle, Clock, Edit, ExternalLink, ThumbsUp, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Project {
    id: number;
    title: string;
    url: string;
    description: string | null;
    votes_count: number;
    user: {
        id: number;
        name: string;
    };
    user_has_voted?: boolean;
    created_at: string;
}

interface ProjectsListProps {
    projects: {
        data: Project[];
        links: {
            first: string;
            last: string;
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: Array<{
                url: string | null;
                label: string;
                active: boolean;
            }>;
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function ProjectsList({ projects }: ProjectsListProps) {
    const { auth } = usePage().props as any;
    const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});

    const handleVote = async (projectId: number, hasVoted: boolean) => {
        setIsLoading((prev) => ({ ...prev, [projectId]: true }));

        try {
            if (hasVoted) {
                await fetch(`/projects/${projectId}/votes`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
            } else {
                await fetch(`/projects/${projectId}/votes`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
            }
            
            // Refresh the page to update the vote count
            window.location.reload();
        } catch (error) {
            console.error('Error voting for project:', error);
        } finally {
            setIsLoading((prev) => ({ ...prev, [projectId]: false }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-black">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Projects</h1>
                        <p className="mt-2 text-gray-400">Discover and vote for amazing projects from our community.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link 
                            href={route('projects.top')} 
                            className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                        >
                            <ArrowUpCircle className="h-4 w-4" />
                            Top Projects
                        </Link>
                        <Link 
                            href={route('projects.index')} 
                            className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                        >
                            <Clock className="h-4 w-4" />
                            Latest Projects
                        </Link>
                        <Link 
                            href={route('projects.create')} 
                            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                        >
                            Add Project
                        </Link>
                    </div>
                </div>

                {/* Projects List */}
                <div className="grid gap-6">
                    {projects.data.length === 0 ? (
                        <Card className="p-8 text-center bg-gray-900 border-gray-800">
                            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                            <p className="text-gray-400 mb-4">Be the first to share an amazing project with our community.</p>
                            <Link
                                href={route('projects.create')}
                                className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                            >
                                Add Project
                            </Link>
                        </Card>
                    ) : (
                        projects.data.map((project) => (
                            <Card key={project.id} className="p-6 bg-gray-900 border-gray-800 hover:border-blue-500/50 transition-colors">
                                <div className="flex flex-col md:flex-row gap-4 justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
                                        <a 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-500 hover:text-blue-400 flex items-center gap-1 mb-3"
                                        >
                                            {project.url}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                        {project.description && (
                                            <p className="text-gray-400 mb-4">{project.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>Posted by {project.user.name}</span>
                                            <span>•</span>
                                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={() => handleVote(project.id, !!project.user_has_voted)}
                                            disabled={isLoading[project.id]}
                                            className={`flex items-center gap-2 ${
                                                project.user_has_voted
                                                    ? 'bg-blue-500 hover:bg-blue-600'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                        >
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>{project.votes_count}</span>
                                        </Button>
                                        
                                        {auth?.user?.id === project.user.id && (
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('projects.edit', project.id)}
                                                    className="p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={route('projects.destroy', project.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {projects.data.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center gap-2">
                            {projects.meta.links.map((link, i) => {
                                if (link.url === null) {
                                    return (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-md bg-gray-800 text-gray-500 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1 rounded-md ${
                                            link.active
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
