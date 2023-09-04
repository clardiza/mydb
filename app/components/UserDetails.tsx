'use client';

import { Poppins, Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserDetails(userdetails: UserDetails[]) {
  const router = useRouter();

  Object.entries(userdetails).map(([key, userdetails]) => {
    console.log(key);
    console.log(userdetails);
  });

  return (
    <div>
      {Object.entries(userdetails).map(([key, userdetail]) => {
        return (
          <section
            key={userdetail.userId}
            className="flex flex-col justify-center items-center transition-opacity ease-in-out duration-1000">
            <div> {userdetail.userId}</div>
            <div> {userdetail.email}</div>
            <div> {userdetail.firstname}</div>
            <div> {userdetail.lastname}</div>
            <div> {userdetail.birthday}</div>
            <div> {userdetail.role}</div>
          </section>
        );
      })}
    </div>
  );
}
