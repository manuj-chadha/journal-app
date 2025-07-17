import DeleteCollectionDialog from "@/components/delete-collection";
import { JournalFilters } from "@/components/journal-filters";
import CollectionLoading from "@/components/skeleton/CollectionLoading";
import API from "@/lib/axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function CollectionPage() {
  const { collectionId } = useParams();
  // const location=useLocation();
  // const unorganized=location.pathname.includes("unorganized");
  
  
  const [entries, setEntries] = useState([]);
  const [collection, setCollection] = useState({});
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/collections/${collectionId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data);
          
          setEntries(res.data.data.entries);
          setCollection(res.data.data.collection);
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionId]);
  if(loading) return <CollectionLoading />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold gradient-title">
            { collection?.title || "Collection" }
            {/* { unorganized
              ? "Unorganized Entries"
              : collection?.title || "Collection"} */}
          </h1>
          {collection && (
            <DeleteCollectionDialog
              collection={collection}
              entriesCount={entries.length}
            />
          )}
        </div>
        {collection?.description && (
          <h2 className="font-extralight text-left pl-1">{collection.description}</h2>
        )}
      </div>

      <JournalFilters entries={entries} title={collection.title} />
    </div>
  );
}
