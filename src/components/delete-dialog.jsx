import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "@/lib/axios";

export default function DeleteDialog({ entry }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ isDeleting, setIsDeleting ]=useState(false);

  // const {
  //   loading: isDeleting,
  //   fn: deleteEntryFn,
  //   data: deletedEntry,
  // } = useFetch(deleteJournalEntry);

  // useEffect(() => {
  //   if (deletedEntry && !isDeleting) {
  //     setDeleteDialogOpen(false);
  //   }
  // }, [deletedEntry, isDeleting]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.delete(`/journal/${entry.id}`, {withCredentials: true});
      setDeleteDialogOpen(false);
      toast.error("Journal entry deleted successfully");
      navigate(
        `/collection/${
          entry.collectionId ? entry.collectionId : "unorganized"
        }`
      );
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsDeleting(false);
    }

  };

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            journal entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
