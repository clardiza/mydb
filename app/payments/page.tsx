import { Payment, columns } from './columns';
import { DataTable } from '@/components/data-table';

async function getData(): Promise<Payment[]> {
  //fetch data from your API
  return [
    {
      id: '728ed53f',
      amount: 100,
      status: 'pending',
      email: 'tina.ulep@gmail.com',
    },
    {
      id: '728ed34d',
      amount: 200,
      status: 'success',
      email: 'kaylee@ulep.net',
    },
    {
      id: '728ed21a',
      amount: 300,
      status: 'processing',
      email: 'jp@ulep.net',
    },
    {
      id: '128ed53f',
      amount: 100,
      status: 'pending',
      email: 'tina.ulep@gmail.com',
    },
    {
      id: '128ed34d',
      amount: 200,
      status: 'success',
      email: 'kaylee@ulep.net',
    },
    {
      id: '128ed21a',
      amount: 300,
      status: 'processing',
      email: 'jp@ulep.net',
    },
    {
      id: '328ed53f',
      amount: 100,
      status: 'pending',
      email: 'tina.ulep@gmail.com',
    },
    {
      id: '328ed34d',
      amount: 200,
      status: 'success',
      email: 'kaylee@ulep.net',
    },
    {
      id: '328ed21a',
      amount: 300,
      status: 'processing',
      email: 'jp@ulep.net',
    },
    {
      id: '428ed53f',
      amount: 100,
      status: 'pending',
      email: 'tina.ulep@gmail.com',
    },
    {
      id: '428ed34d',
      amount: 200,
      status: 'success',
      email: 'kaylee@ulep.net',
    },
    {
      id: '428ed21a',
      amount: 300,
      status: 'processing',
      email: 'jp@ulep.net',
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
