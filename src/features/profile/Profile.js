import React from "react";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfileContent from "../../components/Profile/ProfileContent/ProfileContent";

const Profile = () => {
  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-lg-2 col-md-12 col-12">
          <ProfileCard />
        </div>
        <div className="col-lg-10 col-md-12 col-12">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
