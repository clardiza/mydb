'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  searchParams: {
    search?: string;
  };
};

// Main Function
const OrganizationsPage = ({ searchParams }: Props) => {
  const { search } = searchParams;
  const router = useRouter();
  const pathname = usePathname();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Loads inital data / Reloads when search param changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        /* GET - /app/api/objects/route.ts */
        const response = await fetch(`/api/organizations?search=${search}`);

        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]); // <-- putting [search] tells NextJS to reload the page when search changes, otherwise, useEffect only runs once

  // Handles the delete operation
  const handleDeleteOrganization = async (id: number) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        /* DELETE - /app/api/objects/[id]/route.ts */
        await fetch(`/api/organizations/${id}`, {
          method: 'DELETE',
        });

        const filteredOrganizations = organizations.filter(
          (data) => data.id !== id
        );
        setOrganizations(filteredOrganizations);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handles the search operation. It will append the search string to the URL
  const handleSearchOrganization = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search');
    const searchString = searchQuery
      ? `${pathname}?search=${searchQuery}`
      : `${pathname}`;
    router.replace(searchString);
  };

  // Display page
  return (
    <>
      <div>OrganizationsPage</div>
      {/* Create Button */}
      <div>
        <Link href="/organizations/new">
          <Button>Create New Organization</Button>
        </Link>
      </div>
      {/* Search Field*/}
      <div>
        <form
          onSubmit={handleSearchOrganization}
          className="hidden items-center lg:inline-flex">
          <input
            id="search"
            name="search"
            type="string"
            placeholder="Search organizations..."
            defaultValue=""
          />
        </form>
      </div>
      {/* List of Items */}
      <div>
        {organizations.map((value) => {
          return (
            <section
              key={value.id}
              className="flex flex-col justify-center items-center transition-opacity ease-in-out duration-1000">
              <div> {value.name}</div>
              <div> {value.description}</div>
              <div> {value.createdAt}</div>
              <div> {value.updatedAt}</div>
              <div className="flex flex-row">
                {/* Edit Button */}
                <div className="space-2 p-2">
                  <Link href={`/organizations/${value.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
                {/* Delete Button */}
                <div className="space-2 p-2">
                  <Button onClick={() => handleDeleteOrganization(value.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default OrganizationsPage;
