import { NextResponse } from 'next/server';
import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export default async function updateOrganization(
  id: number,
  name: string,
  description: string
) {
  try {
    const conn = connect(config);
    const db = drizzle(conn);

    const result = await db
      .update(organizations)
      .set({ name: name, description: description })
      .where(eq(organizations.id, id));

    if (result.rowsAffected < 1)
      return NextResponse.json(
        {
          error: `Couldn't find organization (id = ${id}). Unable to update record.`,
        },
        { status: 404 }
      );

    return NextResponse.json({ id, name, description }, { status: 201 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
