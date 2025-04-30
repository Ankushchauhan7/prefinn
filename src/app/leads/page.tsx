// app/(dashboard)/leads/page.tsx
import DashboardLayout from "../dashboard/layout";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";

const PaymentsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <DashboardLayout>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Leads</h1>
      </div>

      {/* Only render table if token exists */}
      {token ? (
        <DataTable columns={columns} token={token} />
      ) : (
        <div className="text-red-500">No token found. Please log in.</div>
      )}
    </DashboardLayout>
  );
};

export default PaymentsPage;
