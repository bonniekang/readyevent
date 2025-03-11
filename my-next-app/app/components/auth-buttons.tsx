import { signIn, signOut, auth } from "@/auth";

export const SignIn = ({ provider }: { provider?: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button>Sign In</button>
    </form>
  );
};

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button className="w-full p-0">Sign Out</button>
    </form>
  );
};

export const UserButtons = async () => {
  const session = await auth();

  return session ? <SignOut /> : <SignIn />;
};
