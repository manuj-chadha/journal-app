"use client"; // If using Next.js — else ignore this line

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function UserPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
          <Avatar>
            <AvatarImage src="/user.png" />
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-56">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Hello, User!</p>
          <Button variant="destructive" size="sm" className="w-full">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
