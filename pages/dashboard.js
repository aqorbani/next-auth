import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const editHandler = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h3>dashboard</h3>
      <hr />
      <h3>update</h3>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="text"
        name="name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="lastName"
      />
      <input
        type="text"
        name="name"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={editHandler}>edit</button>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
