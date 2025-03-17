import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                    <AppLogoIcon className="size-8 fill-current text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Nuno<span className="text-gray-800 dark:text-white">Reviews</span>
                                </div>
                            </Link>

                            <div className="mt-4 space-y-2 text-center">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                                <p className="text-gray-600 dark:text-gray-300">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
