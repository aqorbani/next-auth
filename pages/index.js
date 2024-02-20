import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();

  const logOutHandler = () => {
    signOut();
  };

  return (
    <>
      <h1>hello</h1>
      {status === "authenticated" ? (
        <>
          <button>
            <Link href="/dashboard">Dashboard</Link>
          </button>
          <button onClick={logOutHandler}>Logout</button>
        </>
      ) : (
        <>
          <button>
            <Link href="/signup">Sign Up</Link>
          </button>
          <button>
            <Link href="/signin">Sign In</Link>
          </button>
        </>
      )}
    </>
  );
}
