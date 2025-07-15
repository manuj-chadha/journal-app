"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import API from "@/lib/axios";
import { getMoodById, getMoodTrend } from "@/lib/moods";

const timeOptions = [
  { value: "7", label: "Last 7 Days" },
  { value: "15", label: "Last 15 Days" },
  { value: "30", label: "Last 30 Days" },
];

// const getMoodById = (id) => {
//   const moods = {
//     happy: { emoji: "😄" },
//     neutral: { emoji: "😐" },
//     sad: { emoji: "😞" },
//   };
//   return moods[id] || { emoji: "❓" };
// };

// const getMoodTrend = (avg) => {
//   if (avg >= 8) return "Great!";
//   if (avg >= 5) return "Okay";
//   return "Not Good";
// };

const MoodAnalytics = () => {
  const [period, setPeriod] = useState("7");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/dashboard?periodDays=${period}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload?.length) {
  //     return (
  //       <div className="bg-white p-4 border rounded-lg shadow-lg">
  //         <p className="font-medium">
  //           {format(parseISO(label), "MMM d, yyyy")}
  //         </p>
  //         <p className="text-orange-600">Average Mood: {payload[0].value}</p>
  //         <p className="text-blue-600">Entries: {payload[1].value}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };
  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const averageScoreData = payload.find(p => p.dataKey === "averageMood");
    const entryCountData = payload.find(p => p.dataKey === "entryCount");

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium">{format(parseISO(label), "MMM d, yyyy")}</p>
        <p className="text-orange-600">
          Average Mood: {averageScoreData?.value ?? "-"}
        </p>
        <p className="text-blue-600">
          Entries: {entryCountData?.value ?? "-"}
        </p>
      </div>
    );
  }
  return null;
};


  if (loading) return <div>Loading...</div>;

  if (!analytics) return <div>No Analytics Data Found.</div>;

  const { timeline, stats, totalEntries } = analytics;
  console.log(stats);
  console.log(timeline);
  
  

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {totalEntries === 0 ? (
        <div>
          No Entries Found.{" "}
          <Link to="/journal/write" className="underline text-orange-400">
            Write New
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEntries}</div>
                <p className="text-xs text-muted-foreground">
                  ~{stats.dailyAverage.toFixed(1)} entries per day
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageMoodScore.toFixed(1)}/10
                </div>
                <p className="text-xs text-muted-foreground">Overall mood score</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mood Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {getMoodById(stats.mostFrequentMood)?.emoji}{" "}
                  {getMoodTrend(stats.averageMoodScore)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mood Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeline}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(parseISO(date), "MMM d")}
                    />
                    <YAxis yAxisId="left" domain={[0, 10]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, "auto"]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="averageMood"
                      stroke="#f97316"
                      name="Average Mood"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="entryCount"
                      stroke="#3b82f6"
                      name="Number of Entries"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MoodAnalytics;
