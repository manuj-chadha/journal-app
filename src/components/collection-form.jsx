import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarLoader } from "react-spinners";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const CollectionForm = React.forwardRef(function CollectionForm(
  { onSuccess, loading, open, setOpen },
  ref
) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.name.trim()) {
      return; // Fallback manual check (shouldn't hit if react-hook-form works)
    }
    onSuccess(data);          // Send data up
    reset();                  // Clear form after submission
    setOpen(false);           // Close dialog
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>

        {loading && <BarLoader className="mb-4" width={"100%"} color="orange" />}

        <form ref={ref} onSubmit={onSubmit} className="space-y-6">
          {/* Collection Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Collection Name</label>
            <Input
              {...register("name", {
                required: "Collection name is required",
                validate: (value) => value.trim().length > 0 || "Name cannot be empty",
              })}
              placeholder="Enter collection name..."
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description (Optional)</label>
            <Textarea
              {...register("description")}
              placeholder="Describe your collection..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Creating..." : "Create Collection"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default CollectionForm;
