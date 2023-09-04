'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Main Function
const CreateOrganizationPage = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [organization, setOrganization] = useState<NewOrganization>({
    name: '',
    description: '',
  });

  // Handles the create operation
  const handleCreateOrganization = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      /* POST - /app/api/objects/new/route.ts */
      const response = await fetch('/api/organizations/new', {
        method: 'POST',
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
      {/* Form with input fields */}
      <form onSubmit={handleCreateOrganization}>
        <div>
          <label>
            {' '}
            Name:
            <input
              value={organization.name}
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
              value={organization.description}
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

export default CreateOrganizationPage;
