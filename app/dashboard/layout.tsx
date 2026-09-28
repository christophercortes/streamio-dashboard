export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <aside>
                { }
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}