import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Nuno Reviews - Discover & Share Amazing Projects">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header/Navigation */}
                <header className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                Nuno<span className="text-gray-800 dark:text-white">Reviews</span>
                            </div>
                        </div>
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('projects.index')}
                                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Browse Projects
                                    </Link>
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                                    >
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-16 text-center md:py-24">
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Discover & Share <span className="text-indigo-600 dark:text-indigo-400">Amazing Projects</span>
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Join our community to discover innovative projects, share your work, and connect with like-minded creators.
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        {auth.user ? (
                            <Link
                                href={route('projects.create')}
                                className="w-full rounded-full bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700 sm:w-auto dark:bg-indigo-700 dark:hover:bg-indigo-600"
                            >
                                Share Your Project
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="w-full rounded-full bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700 sm:w-auto dark:bg-indigo-700 dark:hover:bg-indigo-600"
                            >
                                Join Now
                            </Link>
                        )}
                        <Link
                            href={route('projects.top')}
                            className="w-full rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-lg transition-all hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Explore Top Projects
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-6 py-16">
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-4 inline-flex rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Discover Projects</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Explore a curated collection of innovative projects from creators around the world.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-4 inline-flex rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Upvote Favorites</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Support creators by upvoting projects you love and help them gain visibility.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-4 inline-flex rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Share Your Work</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Showcase your projects to a community of enthusiasts and receive valuable feedback.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 py-16 dark:bg-indigo-800">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to showcase your project?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-indigo-100">
                            Join our growing community of creators and innovators today.
                        </p>
                        {auth.user ? (
                            <Link
                                href={route('projects.create')}
                                className="rounded-full bg-white px-8 py-3 text-base font-medium text-indigo-600 shadow-lg transition-all hover:bg-gray-100 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
                            >
                                Share Your Project
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="rounded-full bg-white px-8 py-3 text-base font-medium text-indigo-600 shadow-lg transition-all hover:bg-gray-100 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-8 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-4 text-xl font-bold text-indigo-600 md:mb-0 dark:text-indigo-400">
                                Nuno<span className="text-gray-800 dark:text-white">Reviews</span>
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                    About
                                </a>
                                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                    Terms
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} NunoReviews. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
