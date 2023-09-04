import getAllUserDetails from '@/src/lib/getAllUserDetails';
import UserDetails from './components/UserDetails';
import slugify from 'slugify';

export default async function Home() {
  const userdetails = await getAllUserDetails();
  console.log(slugify('Tina Lardizabal%#*Ulep231').toLowerCase());
  return <UserDetails {...userdetails} />;
}
