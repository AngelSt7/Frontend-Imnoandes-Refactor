import { ClientPageProperties } from "@/src/features/property/admin/subfeatures/ClientPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/src/features/property/admin/services";

export default async function page() {

  const cookieStore = await cookies();
  const jwt = cookieStore.get("SESSION")?.value;
  
  if (!jwt) redirect("/404");
  
  const user = await User.validate(jwt);
  if (!user) redirect("/404");

  return (
    <div className="custom-container">
      <ClientPageProperties user={user} />
    </div>
  );
}