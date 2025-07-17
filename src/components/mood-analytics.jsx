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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      const averageScoreData = payload.find((p) => p.dataKey === "averageMood");
      const entryCountData = payload.find((p) => p.dataKey === "entryCount");

      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg max-w-[200px]">
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

  return (
    <div className="max-w-5xl mx-auto px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-3xl md:text-5xl font-bold gradient-title">Dashboard</h2>
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
          No Entries Found. {" "}
          <Link to="/journal/write" className="underline text-orange-400">
            Write New
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                  {getMoodById(stats.mostFrequentMood)?.emoji} {" "}
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
              <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] w-full min-w-[310px] max-sm:-ml-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeline}
                    margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(parseISO(date), "MMM d")}
                      className="max-sm:text-xs"
                    />
                    <YAxis yAxisId="left" domain={[0, 10]} className="max-sm:text-xs" />
                    {typeof window !== 'undefined' && window.innerWidth > 640 && (
                      <YAxis yAxisId="right" orientation="right" domain={[0, "auto"]} />
                    )}
                    <Tooltip content={<CustomTooltip />} />
                    {typeof window !== 'undefined' && window.innerWidth > 640 && <Legend />}
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
    </div>
  );
};

export default MoodAnalytics;
