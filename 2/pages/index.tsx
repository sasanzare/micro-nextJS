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

const options = [
  { key: "d", text: "DEVELOPER", value: "DEVELOPER" },
  { key: "u", text: "USER", value: "USER" },
  { key: "a", text: "ADMIN", value: "ADMIN" },
];

const SELECT = options.map((option) => (
  <option key={option.key} value={option.value}>
    {option.text}
  </option>
));
export default function Home(initialUsers) {
  const [users, setUsers] =
    useState<Prisma.UserUncheckedCreateInput[]>(initialUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  // const [optionState, setOptionState] = useState("");
  //  const handleChange =(e, {value}) => setRole(value);
  // const handleChange = (e, { value }) => {
  //   setRole(value);
  //   console.log(role);
  // };
  // const handleChange = (e) => {setRole(e.target.value)
  //   console.log(role);
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 pt-5">
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
              setRole(null);
              setEmail("");
            }}
          >
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Avatar">Avatar</label>
              <input
                type="text"
                id="Avatar"
                className="form-control"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                  <option value="">role</option>
                  <option value="DEVELOPER">DEVELOPER</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
              
              </select>
            </div>
            <button type="submit" className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
