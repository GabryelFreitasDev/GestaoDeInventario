import React, { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import DashboardContent from "../components/dashboardcontent";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;