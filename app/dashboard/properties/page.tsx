import { notFound, redirect } from "next/navigation";
import ClientPageProperties from "@/src/components/dashboard/properties/content/ClientPageProperties";
import { cookies } from "next/headers";
import { User } from "@/src/features/property/admin/services";

export const ValidParams = [
  "action",
  "id",
  "page",
  "create",
  "details",
  "custom-images",
  "edit",
  "changeStatus",
  "limit",
  "departmentId",
  "propertyCategory",
  "propertyType",
  "availability",
  "state",
  "search",
]

export default async function PageProperties() {

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