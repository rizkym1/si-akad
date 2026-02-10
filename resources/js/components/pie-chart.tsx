import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function RoomPieChart({data}: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#22c55e"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
