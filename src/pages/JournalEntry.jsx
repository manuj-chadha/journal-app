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
import { useSelector } from "react-redux";


export default function JournalEntryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const { collections } = useSelector(store => store.collections);
  const [existingEntry, setExistingEntry] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    if (editId) {
      setIsEditMode(true);
      setExistingEntry({
        title: "Edited Entry",
        content: "This is an edited entry.",
        mood: "happy",
        collectionId: "1",
      });
    } else {
      setIsEditMode(false);
      reset();
    }
  }, [editId]);

  useEffect(() => {
    if (isEditMode && existingEntry) {
      reset(existingEntry);
    }
  }, [existingEntry, isEditMode]);

  const onSubmit = handleSubmit((data) => {
    console.log("Submitted:", data);
    toast.success(`Entry ${isEditMode ? "updated" : "created"} successfully!`);
    navigate(`/collection/${data.collectionId || "unorganized"}`);
  });

  const handleSaveDraft = () => {
    if (!isDirty) return toast.error("No changes to save");
    console.log("Draft data:", getValues());
    toast.success("Draft saved");
  };

  const handleCreateCollection = (data) => {
    const newCollection = {
      id: (collections.length + 1).toString(),
      name: data.name,
    };
    setCollections([...collections, newCollection]);
    setValue("collectionId", newCollection.id);
    setIsCollectionDialogOpen(false);
    toast.success(`Collection ${data.name} created!`);
  };

  const isLoading = false;

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <form onSubmit={onSubmit} className="space-y-2 mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title text-center">
          {isEditMode ? "Edit Entry" : "What's on your mind?"}
        </h1>

        {isLoading && <BarLoader className="mb-4" width="100%" color="orange" />}

        {/* Title */}
        <div className="space-y-2">
          <label className="text-md font-medium">Title</label>
          <Input
            disabled={isLoading}
            {...register("title")}
            placeholder="Give your entry a title..."
            className="py-5 md:text-md my-4"
          />
        </div>

        {/* Mood */}
        <div className="space-y-2">
          <label className="text-md my-4 font-medium">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
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

        {/* Content */}
        <div className="space-y-2">
          <label className="text-md my-4 font-medium">
            {getMoodById(getValues("mood"))?.prompt ?? "Write your thoughts..."}
          </label>
          <textarea
            {...register("content")}
            rows={6}
            className="w-full p-4 border rounded-md"
            placeholder="Start writing..."
            disabled={isLoading}
          />
        </div>

        {/* Collection */}
        <div className="space-y-2">
          <label className="text-md my-4 font-medium">Add to Collection (Optional)</label>
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
                <SelectTrigger>
                  <SelectValue placeholder="Choose a collection..." />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">
                    <span className="text-orange-600">+ Create New Collection</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="space-x-4 flex">
          {!isEditMode && (
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={!isDirty}>
              Save as Draft
            </Button>
          )}
          <Button type="submit" variant="journal" disabled={!isDirty}>
            {isEditMode ? "Update" : "Publish"}
          </Button>
          {isEditMode && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate(`/journal/${editId}`)}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <CollectionForm
        loading={false}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
}
