import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditedEntry } from "@/redux/journalSlice";

export default function EditButton({ entry }) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleClick=()=>{    
    dispatch(setEditedEntry(entry));
    navigate(`/journal/write?edit=${entry.id}`)
  }
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit
    </Button>
  );
}
