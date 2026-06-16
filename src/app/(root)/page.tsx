import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-450 mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}

/* import { Show, SignOutButton, SignUpButton } from "@clerk/nextjs";

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
 */
