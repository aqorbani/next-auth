import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1>hello</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
