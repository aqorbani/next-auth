import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>hello</h1>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
      <button>
        <Link href="/signin">Sign In</Link>
      </button>
    </>
  );
}
