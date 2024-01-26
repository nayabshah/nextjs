import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();
  if (session.data?.user) {
    return (
      <div>
        <h1>From client: user is signed in</h1>
        <div>{JSON.stringify(session.data.user)}</div>
      </div>
    );
  }
  return <div>From client: user is Not signed in</div>;
};

export default Profile;
