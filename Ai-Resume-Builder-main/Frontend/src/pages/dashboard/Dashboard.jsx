import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen bg-mesh p-10 md:px-20 lg:px-32">
      <h2 className="font-extrabold text-4xl tracking-tight text-white mb-2">My Resumes</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl font-medium"> 
        Design your professional story with AI. Start creating your next career-defining resume in minutes.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-5 gap-8">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
