"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import dayjs from "dayjs";

export default function AlertHistory() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [caregiverPhone, setCaregiverPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAlertsAndPhone = async () => {
      try {
        const [{ data: alertsData, error: alertsError }, { data: phoneData, error: phoneError }] = await Promise.all([
          supabase
            .from("caregiver_sms_logs")
            .select("message, status, sent_at")
            .eq("user_id", user.id)
            .order("sent_at", { ascending: false })
            .limit(15),
          supabase
            .from("caregiver_contacts")
            .select("caregiver_phone")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
        ]);

        if (alertsError) throw alertsError;
        if (phoneError && phoneError.code !== "PGRST116") throw phoneError;

        setAlerts(alertsData || []);
        setCaregiverPhone(phoneData?.caregiver_phone || "Not registered");
      } catch (err) {
        console.error("[AlertHistory] Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertsAndPhone();
  }, [user]);

  if (loading) {
    return <div className="text-center text-sm text-gray-500">Loading alert history...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg w-full min-h-[380px] flex flex-col mt-6 justify-between">
      <div className="mt-6">
        <h2 className="text-xl text-center font-medium mb-3">Caregiver Alert History</h2>

        <div className="mb-4 mt-8 text-sm text-gray-700">
          <strong>Registered Caregiver Phone:</strong>{" "}
          <span className="text-blue-600 font-medium">{caregiverPhone}</span>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center text-sm text-gray-500">No alerts sent yet.</div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sent At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">{alert.message}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="text-sm text-gray-900">{alert.status}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {dayjs(alert.sent_at).format("MMM D, YYYY h:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}