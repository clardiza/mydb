import { NextResponse } from 'next/server';
import createOrganization from '@/src/lib/organizations/createOrganization';

export async function POST(request: Request) {
  const { name, description } = await request.json();

  return await createOrganization({ name, description });
}
