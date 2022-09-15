import { Prisma } from "@prisma/client";
import { fetcher } from "../utils/fetcher";
import prisma from "../lib/prisma";
import { useState } from "react";

export async function getServerSideProps() {
  const users: Prisma.UserUncheckedCreateInput[] = await prisma.user.findMany();
  return {
    props: { initialUsers: users },
  };
}

export default function Home(initialUsers) {
  const [users, setUsers] =
    useState<Prisma.UserUncheckedCreateInput[]>(initialUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form
            onSubmit={async () => {
              const body: Prisma.UserCreateInput = {
                firstName,
                lastName,
                role,
                email,
                avatar,
              };
              await fetcher("/api/create", { user: body });
              await setUsers([...users, body]);
              setFirstName("");
              setAvatar("");
              setLastName("");
              setRole("");
              setEmail("");
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
