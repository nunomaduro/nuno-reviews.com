import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Nuno Reviews - Discover & Share Amazing Projects">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-black text-white font-[Inter] antialiased">
                {/* Header/Navigation */}
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'py-5'}`}>
                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-2xl font-extrabold tracking-tight">
                                <span className="text-white">Nuno</span>
                                <span className="text-blue-500">Reviews</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="#features" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                                How it works
                            </Link>
                            <Link href={route('projects.index')} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                                Browse Projects
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 text-sm font-medium rounded-md transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 text-sm font-medium rounded-md transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-16 md:pt-40 md:pb-24">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                                    <span className="text-white">Discover</span> <span className="text-blue-500">amazing</span> <span className="text-white">projects</span>
                                </h1>
                                <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl">
                                    Join our community to discover innovative projects, share your work, and connect with like-minded creators.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('projects.create')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 text-base font-medium rounded-md transition-colors inline-flex items-center justify-center"
                                        >
                                            Share Your Project
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 text-base font-medium rounded-md transition-colors inline-flex items-center justify-center"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                    <Link
                                        href={route('projects.top')}
                                        className="border border-gray-800 hover:border-gray-700 bg-black hover:bg-gray-900 text-white px-8 py-3.5 text-base font-medium rounded-md transition-colors inline-flex items-center justify-center"
                                    >
                                        Explore Top Projects
                                    </Link>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                                <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-800">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
                                        <div className="text-center">
                                            <div className="inline-flex rounded-full bg-blue-900/30 p-3 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Project Showcase</h3>
                                            <p className="text-gray-400">Share your work with our community</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-gray-950">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose <span className="text-blue-500">NunoReviews</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">A modern platform for discovering and sharing innovative projects</p>
                        </div>
                        
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="bg-black border border-gray-800 rounded-lg p-8 transition-all hover:border-blue-500/50 group">
                                <div className="mb-6 inline-flex rounded-lg bg-blue-500/10 p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">Discover Projects</h3>
                                <p className="text-gray-400">
                                    Explore a curated collection of innovative projects from creators around the world.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-black border border-gray-800 rounded-lg p-8 transition-all hover:border-blue-500/50 group">
                                <div className="mb-6 inline-flex rounded-lg bg-blue-500/10 p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">Upvote Favorites</h3>
                                <p className="text-gray-400">
                                    Support creators by upvoting projects you love and help them gain visibility.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-black border border-gray-800 rounded-lg p-8 transition-all hover:border-blue-500/50 group">
                                <div className="mb-6 inline-flex rounded-lg bg-blue-500/10 p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">Share Your Work</h3>
                                <p className="text-gray-400">
                                    Showcase your projects to a community of enthusiasts and receive valuable feedback.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it works section */}
                <section id="how-it-works" className="py-24 bg-black">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">How <span className="text-blue-500">it works</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">Three simple steps to get started with NunoReviews</p>
                        </div>
                        
                        <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
                            {/* Step 1 */}
                            <div className="relative">
                                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                                    1
                                </div>
                                <div className="border border-gray-800 rounded-lg p-8 h-full bg-gray-950">
                                    <h3 className="text-xl font-bold mb-3">Create an account</h3>
                                    <p className="text-gray-400">
                                        Sign up for free and join our community of creators and innovators.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative">
                                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                                    2
                                </div>
                                <div className="border border-gray-800 rounded-lg p-8 h-full bg-gray-950">
                                    <h3 className="text-xl font-bold mb-3">Share your project</h3>
                                    <p className="text-gray-400">
                                        Upload your project details, images, and links to showcase your work.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative">
                                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                                    3
                                </div>
                                <div className="border border-gray-800 rounded-lg p-8 h-full bg-gray-950">
                                    <h3 className="text-xl font-bold mb-3">Get feedback</h3>
                                    <p className="text-gray-400">
                                        Receive upvotes and comments from the community to improve your work.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Ready to showcase your project?</h2>
                                <p className="text-blue-100 mb-8 text-lg max-w-xl">
                                    Join our growing community of creators and innovators today and get your work in front of an engaged audience.
                                </p>
                                {auth.user ? (
                                    <Link
                                        href={route('projects.create')}
                                        className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3.5 rounded-md transition-colors"
                                    >
                                        Share Your Project
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3.5 rounded-md transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="absolute -inset-1 bg-blue-400/30 rounded-2xl blur-xl"></div>
                                <div className="relative bg-blue-900/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-blue-500/20 rounded-full p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Showcase your work</h3>
                                            <p className="text-blue-100">Get your projects in front of the right audience</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-blue-500/20 rounded-full p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Receive feedback</h3>
                                            <p className="text-blue-100">Get valuable insights to improve your work</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-500/20 rounded-full p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Build your reputation</h3>
                                            <p className="text-blue-100">Establish yourself in the community</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black py-16 border-t border-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="md:col-span-1">
                                <div className="text-2xl font-extrabold tracking-tight mb-4">
                                    <span className="text-white">Nuno</span>
                                    <span className="text-blue-500">Reviews</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Discover and share amazing projects with our community of creators and innovators.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect x="2" y="9" width="4" height="12"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-white font-bold mb-4">Platform</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Features</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">How it works</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-white font-bold mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">About</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Blog</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Careers</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-white font-bold mb-4">Legal</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Cookie Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray-500 text-sm mb-4 md:mb-0">
                                &copy; {new Date().getFullYear()} NunoReviews. All rights reserved.
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
