import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { NextResponse } from 'next/server';

export default async function getOrganizations() {
  try {
    const conn = connect(config);
    const db = drizzle(conn);

    const results: Organization[] = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        description: organizations.description,
        createdAt: organizations.createdAt,
        updatedAt: organizations.updatedAt,
      })
      .from(organizations);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
