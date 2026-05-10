import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 }
];

function AdminAnalytics() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics</h2>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" />
      </BarChart>
    </div>
  );
}

export default AdminAnalytics;