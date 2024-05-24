import React from "react";

const ProfileImage = ({ image }) => {
  return (
    <div className="profileImage_image">
      <img src={image.src} className="profilePic" />
    </div>
  );
};

export default ProfileImage;
