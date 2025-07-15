import React from "react";
import { Card, CardContent } from "./ui/card";
// import Link from "next/link";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getMoodById } from "@/lib/moods";

const EntryCard = ({ entry, collectionTitle }) => {
  return (
    <Link to={`/journal/${entry.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getMoodById(entry?.mood).emoji}</span>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
              </div>
              <div
                className="text-gray-600 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
            <time className="text-sm text-gray-500 whitespace-nowrap">
              {format(new Date(entry.date), "MMM d, yyyy")}
            </time>
          </div>
          {collectionTitle && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm px-2 py-1 bg-orange-100 text-orange-800 rounded">
                {collectionTitle}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default EntryCard;
