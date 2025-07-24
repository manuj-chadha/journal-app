import Collections from "@/components/collections";
import MoodAnalytics from "@/components/mood-analytics";
import { useState } from "react";

const Dashboard = () => {
  const collections = useState(); 
  const entriesByCollection = {}; 

  return (
    <div className="px-4 py-8 space-y-8">
      {/* Analytics Section */}
      <section className="space-y-4">
        <MoodAnalytics />
      </section>

      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
  );
};

export default Dashboard;
