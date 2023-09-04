import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export default async function deleteOrganization(id: number) {
  try {
    const conn = connect(config);
    const db = drizzle(conn);

    const result = await db
      .delete(organizations)
      .where(eq(organizations.id, id));

    if (result.rowsAffected < 1)
      return NextResponse.json(
        {
          error: `Could not find organization (id = ${id}). Unable to delete organization.`,
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: `Successfully deleted organization (id = ${id}).`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
