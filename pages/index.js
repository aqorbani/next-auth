import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const logOutHandler = () => {
    signOut();
  };

  return (
    <>
      <h1>hello</h1>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
      <button>
        <Link href="/signin">Sign In</Link>
      </button>
      <button>
        <Link href="/dashboard">Dashboard</Link>
      </button>
      <button onClick={logOutHandler}>Logout</button>
    </>
  );
}
