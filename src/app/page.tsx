import { Show, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Show when="signed-out">
        <SignUpButton>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <SignOutButton>
          <button className="bg-pink-500 hover:bg-pink-700 text-black font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </SignOutButton>
      </Show>
    </>
  );
}
