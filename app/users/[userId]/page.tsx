import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import getUserDetails from '@/src/lib/getUserDetails';

async function getData(id: number): Promise<UserDetails> {
  const userdetails = await getUserDetails(id);
  console.log(userdetails);
  return userdetails;
}

interface UserPageProps {
  params: {
    userId: number;
  };
}

export default function UserPage({ params }: UserPageProps) {
  const ret = getData(params.userId);
  console.log('ret ' + ret);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Edit user details - {params.userId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">User Id</Label>
              <Input id="userId" placeholder="User Id" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="email" placeholder="Your email" value="tina" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
