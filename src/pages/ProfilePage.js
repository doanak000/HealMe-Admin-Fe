import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import Profile from "../features/profile/Profile";

const ProfilePage = () => {
  return (
    <div>
      <LayoutUser>
        <Profile />
      </LayoutUser>
    </div>
  );
};

export default ProfilePage;
