"use client";

import { UserButton, Show, SignInButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <div className="flex items-center gap-4">
      {/* Renders only when the user is authenticated */}
      <Show when="signed-in">
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<User className="size-4" />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      </Show>

      {/* Renders only when the user is logged out */}
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-200 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
            Sign In
          </button>
        </SignInButton>
      </Show>
    </div>
  );
}

export default HeaderProfileBtn;
