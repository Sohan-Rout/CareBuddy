

"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { startOfWeek, startOfMonth, endOfToday } from "date-fns";

export default function MoodBarChart() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("weekly");

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    let fromDate;
    const today = endOfToday();

    if (range === "weekly") {
      fromDate = startOfWeek(today);
    } else if (range === "monthly") {
      fromDate = startOfMonth(today);
    } else {
      fromDate = new Date(2000, 0, 1); // all time
    }

    const { data, error } = await supabase
      .from("mood_logs")
      .select("sentiment")
      .eq("user_id", user.id)
      .gte("created_at", fromDate.toISOString())
      .lte("created_at", today.toISOString());

    if (error) {
      console.error("Error fetching mood analytics:", error);
      setLoading(false);
      return;
    }

    const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
    data.forEach((log) => {
      if (log.sentiment === "positive") sentimentCounts.positive += 1;
      else if (log.sentiment === "neutral") sentimentCounts.neutral += 1;
      else if (log.sentiment === "negative") sentimentCounts.negative += 1;
    });

    setData([
      { sentiment: "Positive", count: sentimentCounts.positive },
      { sentiment: "Neutral", count: sentimentCounts.neutral },
      { sentiment: "Negative", count: sentimentCounts.negative },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user, range]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full">
      <h3 className="text-xl font-medium mb-4 text-center">Mood Analytics Panel</h3>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setRange("weekly")}
          className={`px-3 py-1 rounded ${range === "weekly" ? "bg-primary text-black border border-black" : "bg-gray-200 text-gray-700"}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setRange("monthly")}
          className={`px-3 py-1 rounded ${range === "monthly" ? "bg-primary text-black border border-black" : "bg-gray-200 text-gray-700"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setRange("all")}
          className={`px-3 py-1 rounded ${range === "all" ? "bg-primary text-black border border-black" : "bg-gray-200 text-gray-700"}`}
        >
          All Time
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading analytics...</div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveBar
            data={data}
            keys={["count"]}
            indexBy="sentiment"
            margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
            padding={0.3}
            colors={({ id, data }) =>
              data.sentiment === "Positive" ? "#34D399" : data.sentiment === "Neutral" ? "#FBBF24" : "#F87171"
            }
            axisBottom={{
              tickSize: 0,
              tickPadding: 8,
              tickRotation: 0,
              legend: "Sentiment",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 8,
              legend: "Count",
              legendPosition: "middle",
              legendOffset: -32,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#1F2937"
            animate={true}
            motionConfig="gentle"
          />
        </div>
      )}
    </div>
  );
}