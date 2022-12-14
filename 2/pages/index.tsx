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

export default function Home({ initialUsers }) {
  const [users, setUsers] =
    useState<Prisma.UserUncheckedCreateInput[]>(initialUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState();

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <div className="container py-5">
      <div className="row flex-column">
        <h4 className="col-lg-6 col-md-10 col-12 mx-auto py-2 text-center shadow rounded text-success">
          Create a user
        </h4>
        <div className="col-lg-6 col-md-10 col-12 mx-auto pt-3 pb-1 my-2 shadow rounded">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
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
                required
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
                required
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
                required
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
                value={role || "USER"}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="form-group d-flex">
              <button
                type="submit"
                className="btn btn-info col-md-4 col-sm-6 mx-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <hr className="col-12 mt-5" />
        <h4 className="col-lg-6 col-md-10 col-12 mx-auto py-2 mt-4 text-center shadow rounded text-secondary">
          Users table
        </h4>
        <div className="col-lg-6 col-md-10 col-12 mx-auto p-0">
          <div className="table-responsive mt-2 shadow rounded ">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={index}>
                    <th>{index}</th>
                    <td className="d-flex " style={{ width: "30%" }}>
                      <img
                        className="rounded-circle w-100"
                        src={u.avatar ? u.avatar : "./images/avatar.jpeg"}
                        alt={u.firstName}
                      />
                      <div className="ml-2">
                        <div>{u.firstName + " " + u.lastName}</div>
                        <small>{capitalize(u.role)}</small>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          await fetcher("/api/delete", { id: u.id });
                          await setUsers(users.filter((usr) => usr !== u));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
