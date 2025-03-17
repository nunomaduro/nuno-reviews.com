import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <AppLogoIcon className="size-6 fill-current text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="truncate font-bold text-indigo-600 dark:text-indigo-400">Nuno<span className="text-gray-800 dark:text-white">Reviews</span></span>
            </div>
        </>
    );
}
