'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UpdateOrganizationPageProps = {
  params: {
    id: number;
  };
};

// Main Function
const UpdateOrganizationPage = ({ params }: UpdateOrganizationPageProps) => {
  const router = useRouter();

  const [organization, setOrganization] = useState<Organization>();
  const [submitting, setSubmitting] = useState(false);

  // Loads inital data
  useEffect(() => {
    const fetchData = async () => {
      try {
        /* GET - /app/api/objects/[id]/route.ts */
        const response = await fetch(`/api/organizations/${params.id}`);
        const data = await response.json();

        setOrganization(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  // Handles the update operation
  const handleUpdateOrganization = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      /* PATCH - /app/api/objects/[id]/route.ts */
      const response = await fetch(`/api/organizations/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: organization?.name,
          description: organization?.description,
        }),
      });

      if (response.ok) {
        router.push('/organizations');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Display page
  return (
    <>
      <div>UpdateOrganizationPage</div>
      {/* Form with input fields */}
      <form onSubmit={handleUpdateOrganization}>
        <div>
          <label>
            {' '}
            Id:
            <input value={organization?.id} placeholder="id" disabled />
          </label>
        </div>
        <div>
          <label>
            {' '}
            Name:
            <input
              value={organization?.name}
              onChange={(e) =>
                setOrganization({ ...organization, name: e.target.value })
              }
              placeholder="name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            {' '}
            Description
            <input
              value={organization?.description}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  description: e.target.value,
                })
              }
              placeholder="description"
              required
            />
          </label>
        </div>
        <div>
          <label>
            {' '}
            Created At:
            <input
              value={organization?.createdAt}
              placeholder="createdAt"
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            {' '}
            Updated At:
            <input
              value={organization?.updatedAt}
              placeholder="updatedAt"
              disabled
            />
          </label>
        </div>
        <div className="flex flex-row">
          {/* Cancel Button */}
          <div className="space-2 p-2">
            <Link href="/organizations">
              <Button>Cancel</Button>
            </Link>
          </div>
          {/* Submit Button */}
          <div className="space-2 p-2">
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateOrganizationPage;
