import { columns } from './columns';
import { DataTable } from '@/components/data-table';

import getAllUserDetails from '@/src/lib/getAllUserDetails';

async function getData(): Promise<UserDetails[]> {
  const userdetails = await getAllUserDetails();
  return userdetails;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
