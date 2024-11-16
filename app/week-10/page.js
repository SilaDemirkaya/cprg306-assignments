"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!user ? (
        <>
          <h2>Welcome to the Shopping List App</h2>
          <button
            onClick={async () => {
              try {
                await gitHubSignIn();
              } catch (error) {
                console.error("Error during sign-in:", error);
              }
            }}
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <button
            onClick={async () => {
              try {
                await firebaseSignOut();
              } catch (error) {
                console.error("Error during sign-out:", error);
              }
            }}
          >
            Logout
          </button>
          <br />
          <Link href="/week-10/shopping-list">Go to Shopping List</Link>
        </>
      )}
    </div>
  );
}
