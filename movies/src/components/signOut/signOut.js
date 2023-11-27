import React from "react";
import { auth } from "../../firebase";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
