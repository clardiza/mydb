import { connect } from '@planetscale/database';
import { config } from '@/src/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { persons, users } from '@/src/db/schema';
import { eq, sql } from 'drizzle-orm';

export default async function getUserDetails(id: number): Promise<UserDetails> {
  const conn = connect(config);
  const db = drizzle(conn);

  // SELECT U.id, U.email, P.firstname, P.lastname, P.birthday, U.role
  // FROM users U, persons P
  // WHERE P.id = U.person_id
  const results: UserDetails[] = await db
    .select({
      userId: users.id,
      email: users.email,
      firstname: persons.firstname,
      lastname: persons.lastname,
      birthday: persons.birthday,
      role: users.role,
    })
    .from(users)
    .innerJoin(persons, eq(users.personId, persons.id))
    .where(eq(users.id, id));

  return results[0];
}
