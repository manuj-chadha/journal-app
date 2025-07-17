import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { getMoodById } from "@/lib/moods";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/lib/axios";
// import DeleteDialog from "@/components/delete-dialog";
import EditButton from "@/components/edit-button";
import DeleteDialog from "@/components/delete-dialog";
import Loading from "@/components/skeleton/EntryLoading";
// import { getJournalEntry } from "@/actions/journal";

export default function JournalEntryPage() {
  const { journalId } = useParams();
  const [entry, setEntry]=useState({});
  const mood = getMoodById(entry.mood);
  const [loading, setLoading]=useState(false);

  useEffect(()=> {
    const fetchJournal=async()=>{
      setLoading(true);
      try {
        const res=await API.get(`/journal/${journalId}`, { withCredentials: true });
        if(res.data.success){
          setEntry(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching the journal: ", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [journalId]);

  if(loading) return <Loading />

  return (
    <>
      {/* Header with Mood Image */}
      {/* {entry.moodImageUrl && (
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={entry.moodImageUrl}
            alt="Mood visualization"
            className="object-contain"
            fill
            priority
          />
        </div>
      )} */}

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-bold gradient-title">
                  {entry.title}
                </h1>
              </div>
              <p className="text-gray-500">
                {/* Created {format(new Date(entry.createdAt), "PPP")} */}
                {entry.createdAt ? (
                  format(new Date(entry.createdAt), "PPP")
                ) : (
                  "Unknown Date"
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <EditButton entry={entry} />
              <DeleteDialog entry={entry} />
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {entry.collection && (
              <Link to={`/collection/${entry.collection.id}`}>
                <Badge>Collection: {entry.collection.name}</Badge>
              </Link>
            )}
            <Badge
              variant="outline"
              style={{
                backgroundColor: `var(--${mood?.color}-50)`,
                color: `var(--${mood?.color}-700)`,
                borderColor: `var(--${mood?.color}-200)`,
              }}
            >
              Feeling {mood?.label}
            </Badge>
          </div>
        </div>

        <hr />

        {/* Content Section */}
        <div className="ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 pt-4 border-t">
          {entry.createdAt ? (
                  <>Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}</>
                ) : (
                  "Unknown Date"
                )}
        </div>
      </div>
    </>
  );
}
