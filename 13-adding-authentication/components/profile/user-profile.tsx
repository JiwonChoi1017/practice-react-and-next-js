import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth");
  //   }
  // }, [session, router]);

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
