// UserPage.tsx
import { useEffect } from "react";
import Account from "../../components/Account/account";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../features/user/userSlice";
import { RootState, AppDispatch } from "../../app/store";
import "./userPage.scss";

const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  console.log("User info:", user); // Debugging

  return (
    <main className="main user-page bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {/* Repeating account sections for each account */}
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default UserPage;
