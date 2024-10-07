 "use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
      router.push('/login');
  }, []);

  return (
    <></>
  );
}
