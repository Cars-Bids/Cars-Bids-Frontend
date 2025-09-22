
export default function LotHeaderApproval({ title, subtitle }: { title: string; subtitle?: string; }) {

    return (
        <header className="sticky top-0 z-40">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-1 px-4 py-1">
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-bold sm:text-xl text-black dark:text-gray-200">{title}</h1>
                    {subtitle && <p className="truncate text-xs text-black dark:text-gray-200">{subtitle}</p>}
                </div>

                <div className="hidden items-center gap-2 sm:flex"></div>
            </div>
        </header>
    );
}