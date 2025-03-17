import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PlusCircle, TrendingUp, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Project {
    id: number;
    title: string;
    url: string;
    votes_count: number;
    created_at: string;
}

interface Vote {
    id: number;
    project: {
        id: number;
        title: string;
    };
    created_at: string;
}

interface DashboardProps {
    stats: {
        total_projects: number;
        total_votes: number;
        user_projects: number;
    };
    recent_projects: Project[];
    recent_votes: Vote[];
}

export default function Dashboard({ stats, recent_projects, recent_votes }: DashboardProps) {
    const { auth } = usePage().props as any;
    const [recentActivity, setRecentActivity] = useState<Array<{ type: 'project' | 'vote', data: any, date: Date }>>([]);

    useEffect(() => {
        // Combine projects and votes into a single activity feed
        const projectActivities = recent_projects.map(project => ({
            type: 'project' as const,
            data: project,
            date: new Date(project.created_at)
        }));
        
        const voteActivities = recent_votes.map(vote => ({
            type: 'vote' as const,
            data: vote,
            date: new Date(vote.created_at)
        }));
        
        // Combine and sort by date (newest first)
        const combined = [...projectActivities, ...voteActivities].sort((a, b) => 
            b.date.getTime() - a.date.getTime()
        );
        
        setRecentActivity(combined.slice(0, 5)); // Show only the 5 most recent activities
    }, [recent_projects, recent_votes]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-black">
                {/* Welcome section */}
                <div className="rounded-xl bg-gradient-to-br from-gray-900 to-black p-8 shadow-lg border border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome to NunoReviews</h1>
                            <p className="mt-2 text-gray-400">Your platform for discovering and sharing amazing projects.</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <div className="rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-300">
                                    <span className="font-bold text-blue-400">{stats.total_projects}</span> Projects
                                </div>
                                <div className="rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-300">
                                    <span className="font-bold text-blue-400">{stats.total_votes}</span> Votes
                                </div>
                                <div className="rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-300">
                                    <span className="font-bold text-blue-400">{stats.user_projects}</span> Your Projects
                                </div>
                            </div>
                        </div>
                        <Link 
                            className="flex items-center gap-2 rounded-md bg-blue-500 px-5 py-3 text-white shadow-md hover:bg-blue-600 transition-colors"
                            href={route('projects.create')}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Add New Project
                        </Link>
                    </div>
                </div>
                
                {/* Stats cards */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <div className="rounded-xl bg-gray-900 p-6 shadow-md transition-all hover:shadow-lg border border-gray-800 group hover:border-blue-500/50">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Top Voted Projects</h3>
                        <p className="mt-2 text-gray-400">Discover the most popular projects based on community votes.</p>
                        <div className="mt-3 text-2xl font-bold text-white">{stats.total_votes}</div>
                        <Link 
                            className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                            href={route('projects.index')}
                        >
                            View projects
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="rounded-xl bg-gray-900 p-6 shadow-md transition-all hover:shadow-lg border border-gray-800 group hover:border-blue-500/50">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Total Projects</h3>
                        <p className="mt-2 text-gray-400">Check out all the projects submitted by the community.</p>
                        <div className="mt-3 text-2xl font-bold text-white">{stats.total_projects}</div>
                        <Link 
                            className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                            href={route('projects.index')}
                        >
                            Browse projects
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="rounded-xl bg-gray-900 p-6 shadow-md transition-all hover:shadow-lg border border-gray-800 group hover:border-blue-500/50">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                            <PlusCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Your Projects</h3>
                        <p className="mt-2 text-gray-400">View and manage the projects you've submitted.</p>
                        <div className="mt-3 text-2xl font-bold text-white">{stats.user_projects}</div>
                        <Link 
                            className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                            href={route('projects.create')}
                        >
                            Add new project
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
                
                {/* Activity feed */}
                <div className="rounded-xl bg-gray-900 p-8 shadow-md border border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            <p className="mt-1 text-gray-400">Stay updated with the latest activity on the platform.</p>
                        </div>
                        <Link
                            href={route('projects.index')}
                            className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
                        >
                            View all projects
                        </Link>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                        {recentActivity.length === 0 ? (
                            <div className="rounded-lg border border-gray-800 bg-black/30 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-300">No recent activity to display.</p>
                                            <p className="text-sm text-gray-500 mt-1">Add or review projects to see activity here</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">Just now</span>
                                </div>
                            </div>
                        ) : (
                            recentActivity.map((activity, index) => (
                                <div key={index} className="rounded-lg border border-gray-800 bg-black/30 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                                {activity.type === 'project' ? (
                                                    <PlusCircle className="h-5 w-5" />
                                                ) : (
                                                    <ThumbsUp className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                {activity.type === 'project' ? (
                                                    <p className="text-gray-300">
                                                        You added a new project: <Link href={route('projects.show', activity.data.id)} className="text-blue-500 hover:text-blue-400">{activity.data.title}</Link>
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-300">
                                                        You voted for: <Link href={route('projects.show', activity.data.project.id)} className="text-blue-500 hover:text-blue-400">{activity.data.project.title}</Link>
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Link 
                                            href={activity.type === 'project' 
                                                ? route('projects.show', activity.data.id) 
                                                : route('projects.show', activity.data.project.id)}
                                            className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Your Projects Section */}
                {recent_projects.length > 0 && (
                    <div className="rounded-xl bg-gray-900 p-8 shadow-md border border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">Your Recent Projects</h2>
                                <p className="mt-1 text-gray-400">Projects you've recently added to the platform.</p>
                            </div>
                            <Link
                                href={route('projects.create')}
                                className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
                            >
                                <PlusCircle className="h-4 w-4" />
                                Add New Project
                            </Link>
                        </div>
                        
                        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {recent_projects.map((project) => (
                                <Link 
                                    key={project.id} 
                                    href={route('projects.show', project.id)}
                                    className="block"
                                >
                                    <div className="rounded-lg border border-gray-800 bg-black/30 p-6 h-full hover:border-blue-500/50 transition-colors">
                                        <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{project.title}</h3>
                                        <div className="flex items-center text-sm text-gray-400 mt-4">
                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                            <span>{project.votes_count}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
