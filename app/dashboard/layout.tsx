import Navigation from "@/src/components/ui/Navigation";
import { UserProvider } from "@/src/contexts/UserContext";
import { User } from "@/src/features/property/admin/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PropertiesLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("SESSION")?.value
    if (!jwt) return redirect('/404');

    const user = await User.validate(jwt);
    if (user) return (
        <div className="flex flex-col min-h-screen">
            <Navigation user={user} />
            <UserProvider user={user}>
                <div className="flex-1 flex flex-col mt-8 mb-4">{children}</div>
            </UserProvider>
        </div>
    )
}