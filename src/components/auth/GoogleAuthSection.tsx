// import { auth } from "@/auth";
// import { handleSignIn, handleSignOut } from "@/lib/auth-actions";

// export const  GoogleAuthSection = async () => {
//   const session = await auth();
//   const user = session?.user;

//   return (

//     <form action={handleSignIn}>
//       <button type="submit" className="bg-blue-500 cursor-pointer px-4 py-2 rounded text-white">
//         Sign in with Google
//       </button>
//     </form>
//   );
// }

// components/auth/GoogleAuthSection.tsx
"use client";

import { signIn } from "next-auth/react";

export default function GoogleAuthSection() {
  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleGoogleLogin}
        className="text-sm text-white bg-slate-900 px-4 py-2 rounded hover:bg-red-950 cursor-pointer transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}


