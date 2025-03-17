import { Head, Link, usePage } from '@inertiajs/react';
import { Edit, ExternalLink, ThumbsUp, Trash2 } from 'lucide-react';
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

interface ProjectShowProps {
    project: Project;
}

export default function ProjectShow({ project }: ProjectShowProps) {
    const { auth } = usePage().props as any;
    const [isLoading, setIsLoading] = useState(false);
    const [voteCount, setVoteCount] = useState(project.votes_count);
    const [hasVoted, setHasVoted] = useState(project.user_has_voted);

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
            title: project.title,
            href: `/projects/${project.id}`,
        },
    ];

    const handleVote = async () => {
        setIsLoading(true);

        try {
            if (hasVoted) {
                await fetch(`/projects/${project.id}/votes`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setVoteCount((prev) => prev - 1);
                setHasVoted(false);
            } else {
                await fetch(`/projects/${project.id}/votes`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setVoteCount((prev) => prev + 1);
                setHasVoted(true);
            }
        } catch (error) {
            console.error('Error voting for project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-black">
                <div className="max-w-4xl mx-auto w-full">
                    <Card className="p-8 bg-gray-900 border-gray-800">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <h1 className="text-3xl font-bold text-white">{project.title}</h1>
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={handleVote}
                                        disabled={isLoading}
                                        className={`flex items-center gap-2 ${
                                            hasVoted
                                                ? 'bg-blue-500 hover:bg-blue-600'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{voteCount}</span>
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
                            
                            <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-lg"
                            >
                                {project.url}
                                <ExternalLink className="h-4 w-4" />
                            </a>
                            
                            {project.description && (
                                <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
                                    <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                                    <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
                                </div>
                            )}
                            
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                <span>Posted by {project.user.name}</span>
                                <span>•</span>
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="border-t border-gray-800 pt-6 mt-2">
                                <Link
                                    href={route('projects.index')}
                                    className="text-blue-500 hover:text-blue-400 transition-colors"
                                >
                                    ← Back to projects
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
