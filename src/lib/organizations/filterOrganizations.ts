import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { organizations } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { like, or } from 'drizzle-orm';

export default async function filterOrganizations(str: string) {
  const searchStr = '%' + str + '%';

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
      .where(
        or(
          like(organizations.name, searchStr),
          like(organizations.description, searchStr)
        )
      );

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.body }, { status: error.status });
  }
}
