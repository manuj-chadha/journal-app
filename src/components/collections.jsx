"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import API from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllCollections from "@/hooks/useGetCollections";
import { setCollections } from "@/redux/collectionSlice";

const initialEntriesByCollection = {
  unorganized: [
    { id: "e1", title: "Entry without a collection" },
    { id: "e2", title: "Random Thoughts" },
  ],
  "1": [
    { id: "e3", title: "Feeling Grateful Today" },
    { id: "e4", title: "Gratitude Entry 2" },
  ],
  "2": [{ id: "e5", title: "Trip to the mountains" }],
};

const Collections = () => {
  useGetAllCollections();
  const {collections} = useSelector(store => store.collections);
  const orderedCollections = [
  ...(collections?.filter((c) => c.title === "Unorganized") || []),
  ...(collections?.filter((c) => c.title !== "Unorganized") || []),
];

  const [entriesByCollection, setEntriesByCollection] = useState(
    initialEntriesByCollection
  );
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  const handleCreateCollection = async (data) => {
    setLoading(true);
    try {
      const res=await API.post("/collections", data, { headers: {"Content-Type": "application/json"}, withCredentials: true});
      setIsCollectionDialogOpen(false);
      toast.success(`Collection ${data.title} created!`);
      dispatch(setCollections([...collections, res.data.data]));
  
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
      setIsCollectionDialogOpen(false);
    } finally {
      setLoading(false);
    }
  }

  if (collections?.length === 0 && entriesByCollection.unorganized?.length === 0)
    return null;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {collections && collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.title}
            entries={collection.entries || []}
          />
        ))} */}
        {orderedCollections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.title}
            entries={collection.entries || []}
            isUnorganized={collection.title === "Unorganized"}
          />
        ))}


        {/* Modal form for creating collection */}
        <CollectionForm
          loading={loading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
