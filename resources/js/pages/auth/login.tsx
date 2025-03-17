import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Welcome back! Enter your credentials to access your account">
            <Head title="Log in" />

            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-2xl font-extrabold tracking-tight">
                    <span className="text-white">Nuno</span>
                    <span className="text-blue-500">Reviews</span>
                </Link>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-300">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="rounded-md border-gray-800 bg-gray-900 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-blue-500 hover:text-blue-400" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="rounded-md border-gray-800 bg-gray-900 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 bg-gray-900"
                        />
                        <Label htmlFor="remember" className="text-gray-300">Remember me</Label>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-4 w-full rounded-md bg-blue-500 px-5 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-600 disabled:opacity-70" 
                        tabIndex={4} 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} className="font-medium text-blue-500 hover:text-blue-400" tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mt-4 rounded-md bg-green-900/30 p-3 text-center text-sm font-medium text-green-400">{status}</div>}
        </AuthLayout>
    );
}
