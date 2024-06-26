import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log(account);
    if (account !== null && account.dob && account.dob !== "") {
      account.dob = new Date(account.dob).toISOString().split("T")[0];
    }
    setProfile(account);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  return (
    <div className="col-md-4 col-12">
      <h1>Profile</h1>
      <Link
        to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-100 mb-2"
      >
        Users
      </Link>
      {profile && (
        <form>
          <div className="form-group">
            <input
              placeholder="username"
              className="form-control mb-2"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              placeholder="password"
              className="form-control mb-2"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <input
              placeholder="first name"
              className="form-control mb-2"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              placeholder="last name"
              className="form-control mb-2"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              placeholder="date of birth"
              className="form-control mb-2"
              value={profile.dob}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <input
              placeholder="email"
              className="form-control mb-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <select
              className="form-control mb-2"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            <button className="form-control btn btn-primary mb-2" onClick={save}>
              Save
            </button>
            <button className="form-control btn btn-danger" onClick={signout}>
              Signout
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
