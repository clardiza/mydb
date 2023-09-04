import filterOrganizations from '@/src/lib/organizations/filterOrganizations';
import getOrganizations from '@/src/lib/organizations/getOrganizations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchStr = searchParams.get('search')?.toString();
  console.log('searchParams', searchParams);
  console.log('searchStr', searchStr);

  if (searchStr != '' && searchStr != 'undefined' && searchStr != undefined)
    return await filterOrganizations(searchStr);

  return await getOrganizations();
}
