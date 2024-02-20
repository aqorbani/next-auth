import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  });

  const signInHandler = async (e) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={signInHandler}>Sign In</button>
    </div>
  );
}
