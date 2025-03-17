import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-indigo-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
                {/* Welcome section */}
                <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Nuno Reviews</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Your platform for discovering and sharing amazing projects.</p>
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link 
                            className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-white shadow-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                            href={route('projects.create')}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Add New Project
                        </Link>
                    </div>
                </div>
                
                {/* Stats cards */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                            <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Voted Projects</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Discover the most popular projects based on community votes.</p>
                        <Link 
                            className="mt-4 px-0 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                            href={route('projects.index')}
                        >
                            View projects
                        </Link>
                    </div>
                    
                    <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                            <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Submissions</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Check out the latest projects submitted by the community.</p>
                        <Link 
                            className="mt-4 px-0 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                            href={route('projects.index')}
                        >
                            Browse recent
                        </Link>
                    </div>
                    
                    <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                            <PlusCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Contributions</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">View and manage the projects you've submitted and voted on.</p>
                        <Link 
                            className="mt-4 px-0 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                            href={route('projects.index')}
                        >
                            View your projects
                        </Link>
                    </div>
                </div>
                
                {/* Activity feed */}
                <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Stay updated with the latest activity on the platform.</p>
                    
                    <div className="mt-6 space-y-4">
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/30">
                            <p className="text-gray-700 dark:text-gray-300">No recent activity to display.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
