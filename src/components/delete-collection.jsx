"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "@/lib/axios";

export default function DeleteCollectionDialog({ collection, entriesCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res=await API.delete(`/collections/${collection.id}`, {withCredentials: true});
      toast.error(`Collection "${collection.title}" and all its entries deleted`);
      setOpen(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to delete collection");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{collection.title}"?</AlertDialogTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection "{collection.title}"</li>
              <li>{entriesCount} journal {entriesCount === 1 ? "entry" : "entries"}</li>
            </ul>
            <p className="font-semibold text-red-600">This action cannot be undone.</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
            {isDeleting ? "Deleting..." : "Delete Collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
