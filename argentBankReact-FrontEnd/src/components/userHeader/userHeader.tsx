import "./userHeader.scss";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/user/userSlice";
import { AppDispatch } from "../../app/store";

interface UserHeaderProps {
  firstName?: string;
  lastName?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  firstName = "",
  lastName = "",
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
  }, [firstName, lastName]);

  const handleSave = () => {
    const updatedUserInfo = { firstName: newFirstName, lastName: newLastName };
    dispatch(updateProfile(updatedUserInfo)); // Corrected dispatch
    setIsEditMode(false);
  };

  console.log("UserHeader Props:", { firstName, lastName });

  if (isEditMode) {
    return (
      <div className="user-header-modif">
        <h1>Welcome back</h1>
        <div className="input-wrapper">
          <input
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <input
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button
            className="cancel-button"
            onClick={() => setIsEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button" onClick={() => setIsEditMode(true)}>
        Edit Name
      </button>
    </div>
  );
};

export default UserHeader;
