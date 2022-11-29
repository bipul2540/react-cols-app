import React, { useState } from "react";

import UseAnimations from "react-useanimations";
import searchToX from "react-useanimations/lib/searchToX";
import { useUser } from "../../auth/useUser";

const Profile = () => {
  const user = useUser();

  console.log(user);
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <h1>Hey !!!!</h1>
      <h2 style={{ color: "magenta" }}> {user.email} </h2>
    </div>
  );
};

export default Profile;
