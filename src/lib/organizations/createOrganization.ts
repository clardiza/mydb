import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { NextResponse } from 'next/server';

export default async function createOrganization(
  newOrganization: NewOrganization
) {
  const { name, description } = newOrganization;
  try {
    const conn = connect(config);
    const db = drizzle(conn);

    const response = await db
      .insert(organizations)
      .values({ name, description });

    if (response.rowsAffected < 1)
      return NextResponse.json(
        { error: 'Unable to add organization' },
        { status: 500 }
      );

    const newId = response.insertId;

    return NextResponse.json(
      { id: newId, ...newOrganization },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
