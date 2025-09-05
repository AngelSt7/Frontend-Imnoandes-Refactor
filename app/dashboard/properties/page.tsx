import { notFound, redirect } from "next/navigation";
import ClientPageProperties from "@/src/components/dashboard/properties/content/ClientPageProperties";
import { cookies } from "next/headers";
import { User } from "@/src/services";

const LIMIT = [5, 10, 15];
const DEFAULT_REDIRECT = "/dashboard/properties?page=1&limit=10";

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

export default async function PageProperties({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string, departmentId?: string };
}) {
  const params = await searchParams;
  
  // Validaciones rápidas primero
  const page = Number(params.page);
  const limit = Number(params.limit);
  
  if (!page || page < 1 || !limit || limit < 0 || !LIMIT.includes(limit)) {
    redirect(DEFAULT_REDIRECT);
  }

  const hasInvalidParams = Object.keys(params).some(p => !ValidParams.includes(p));
  if (hasInvalidParams) {
    console.log("Has invalid params");
     notFound();
  }

  // // Operaciones costosas al final
  // const cookieStore = await cookies();
  // const jwt = cookieStore.get("SESSION")?.value;
  
  // if (!jwt) redirect("/404");
  
  // const user = await User.validate(jwt);
  // if (!user) redirect("/404");

  return (
    <div className="custom-container">
      <ClientPageProperties user={"asdasdas"} />
    </div>
  );
}