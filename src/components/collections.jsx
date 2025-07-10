"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import API from "@/lib/axios";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllCollections from "@/hooks/useGetCollections";

// Dummy data setup
const initialCollections = [
  { id: "1", name: "Gratitude Journal" },
  { id: "2", name: "Travel Notes" },
];

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
  const [entriesByCollection, setEntriesByCollection] = useState(
    initialEntriesByCollection
  );
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateCollection = async (data) => {
    setLoading(true);
    try {
      const res=await API.post("/collections", {data}, {withCredentials: true});
      setTimeout(() => {
        const newId = crypto.randomUUID();
        const newCollection = { id: newId, name: data.name };
        // setCollections((prev) => [...prev, newCollection]);
        setEntriesByCollection((prev) => ({ ...prev, [newId]: [] }));
        setIsCollectionDialogOpen(false);
        setLoading(false);
        toast.success(`Collection ${data.name} created!`);
      }, 500); // Simulate async delay
  
    } catch (error) {
      
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

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {/* User Collections */}
        {collections && collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.title}
            entries={collection.entries || []}
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
