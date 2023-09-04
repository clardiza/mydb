import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export default async function getOrganization(id: number) {
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
      .from(organizations)
      .where(eq(organizations.id, id));

    if (results.length < 1)
      return NextResponse.json(
        { error: `Organization (id = ${id}) could not be found.` },
        { status: 404 }
      );

    return NextResponse.json(results[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
