import { FaEye, FaEdit, FaTrashAlt, FaBook, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-600",
  "from-red-400 via-yellow-500 to-green-500",
  "from-blue-500 via-teal-400 to-green-300",
  "from-pink-500 via-red-500 to-yellow-500",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume._id);
    try {
      const response = await deleteThisResume(resume._id);
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };
  return (
    <div
      className="glass-card relative group p-1 h-[280px] rounded-2xl overflow-hidden flex flex-col justify-between"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-6">
        <div className="mb-4 p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
           <FaBook className="text-3xl text-indigo-400" />
        </div>
        <h2 className="text-center font-bold text-xl text-white tracking-tight">
          {resume.title}
        </h2>
      </div>

      <div className="relative z-10 flex items-center justify-around p-3 bg-white/5 backdrop-blur-md rounded-b-2xl border-t border-white/5 shadow-inner">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
          className="h-10 w-10 p-0 rounded-full hover:bg-indigo-500/20 hover:text-indigo-400 group/btn"
        >
          <FaEye className="text-gray-400 group-hover/btn:text-indigo-400 transition-colors" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
          className="h-10 w-10 p-0 rounded-full hover:bg-purple-500/20 hover:text-purple-400 group/btn"
        >
          <FaEdit className="text-gray-400 group-hover/btn:text-purple-400 transition-colors" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setOpenAlert(true)}
          className="h-10 w-10 p-0 rounded-full hover:bg-rose-500/20 hover:text-rose-400 group/btn"
        >
          <FaTrashAlt className="text-gray-400 group-hover/btn:text-rose-400 transition-colors" />
        </Button>
        <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)}>
          <AlertDialogContent className="glass border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action cannot be undone. This will permanently delete your
                Resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 border-white/5 text-white hover:bg-white/20" onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 text-white" onClick={handleDelete} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin text-white" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
