import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import CollectionForm from "@/components/collection-form";
import { getMoodById, MOODS } from "@/lib/moods";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "@/redux/collectionSlice";
import API from "@/lib/axios";
import { cn } from "@/lib/utils";
import useGetAllCollections from "@/hooks/useGetCollections";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateJournalEntry() {
  useGetAllCollections();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const { collections } = useSelector((store) => store.collections);
  const [existingEntry, setExistingEntry] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { editJournal } = useSelector((store) => store.journal);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  const selectedMood = watch("mood");

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  useEffect(() => {
    if (editId && editJournal) {
      setIsEditMode(true);
      setExistingEntry(editJournal);
    } else if (!editId) {
      setIsEditMode(false);
      reset();
    }
  }, [editId, editJournal]);

  useEffect(() => {
    if (isEditMode && existingEntry) {
      reset(existingEntry);
    }
  }, [existingEntry, isEditMode]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    
    data.moodScore = getMoodById(data.mood).score;
    try {
      if (isEditMode) {
        await API.put(`/journal/${editId}/update`, data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        toast.success("Entry updated!");
      } else {
        await API.post("/journal", data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        toast.success("Entry created!");
      }
      navigate(`/collection/${data.collectionId}`);
    } catch (error) {
      toast.error("Failed to save entry");
      console.error("Submission error:", error);
    }
  });

  const handleSaveDraft = () => {
    if (!isDirty) return toast.error("No changes to save");
    console.log("Draft data:", getValues());
    toast.success("Draft saved");
  };

  const handleCreateCollection = async (data) => {
    setLoading(true);
    try {
      const res = await API.post("/collections", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsCollectionDialogOpen(false);
      toast.success(`Collection ${data.title} created!`);
      dispatch(setCollections([...collections, res.data.data]));
    } catch (error) {
      toast.error(error.data?.message || "Failed to create collection");
      setIsCollectionDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <form onSubmit={onSubmit} className="space-y-4 mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title text-center mb-6">
          {isEditMode ? "Edit Entry" : "What's on your mind?"}
        </h1>

        {isLoading && <BarLoader width="100%" color="#fb7185" className="mb-4" />}

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-900">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Give your entry a title..."
            disabled={isLoading}
            className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "bg-pink-50 text-pink-900 placeholder:text-gray-900"
          )}/>
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-900">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-pink-50 text-pink-900">
                  <SelectValue placeholder="Select a mood..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem key={mood.id} value={mood.id}>
                      <span className="flex items-center gap-2">
                        {mood.emoji} {mood.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-900">
            {getMoodById(selectedMood)?.prompt ?? "Write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                readOnly={isLoading}
                modules={{
                  toolbar: toolbarOptions

                }}
                className="bg-pink-50 rounded-md text-pink-900"
                style={{
                  height: "300px",
                  overflowY: "auto",
                }}
                placeholder="Start writing..."
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-900">Add to Collection (Optional)</label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    setIsCollectionDialogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="bg-pink-50 text-pink-900">
                  <SelectValue placeholder="Choose a collection..." />
                </SelectTrigger>
                <SelectContent>
                  {collections &&
                    collections.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.title}
                      </SelectItem>
                    ))}
                  <SelectItem value="new">
                    <span className="text-pink-600">+ Create New Collection</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex gap-4 mt-4">
          {!isEditMode && (
            <Button type="button" variant="secondary" onClick={handleSaveDraft} disabled={!isDirty}>
              Save as Draft
            </Button>
          )}
          <Button type="submit" variant="journal" disabled={!isDirty}>
            {isEditMode ? "Update" : "Publish"}
          </Button>
          {isEditMode && (
            <Button type="button" variant="destructive" onClick={() => navigate(`/journal/${editId}`)}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <CollectionForm
        loading={isLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
}
