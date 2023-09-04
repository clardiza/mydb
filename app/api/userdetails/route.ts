import { NextResponse } from 'next/server';
import getAllUserDetails from '@/src/lib/getAllUserDetails';

export async function GET(request: Request) {
  const userdetails = await getAllUserDetails();

  console.log('userdetails = ' + userdetails);

  return NextResponse.json(userdetails);
}
