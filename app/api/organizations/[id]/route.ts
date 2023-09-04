import getOrganization from '@/src/lib/organizations/getOrganization';
import updateOrganization from '@/src/lib/organizations/updateOrganization';
import deleteOrganization from '@/src/lib/organizations/deleteOrganization';

type apiProps = {
  params: {
    id: number;
  };
};

// GET (fetch data)
export async function GET(request: Request, { params }: apiProps) {
  const { id } = params;

  return await getOrganization(id);
}

// PATCH (update)
export async function PATCH(request: Request, { params }: apiProps) {
  const { id } = params;
  const { name, description } = await request.json();

  return await updateOrganization(params.id, name, description);
}

// DELETE (delete)
export async function DELETE(request: Request, { params }: apiProps) {
  const { id } = params;

  return await deleteOrganization(id);
}
