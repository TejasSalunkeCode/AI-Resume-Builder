import React from "react";
import { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#000000",
      },
    };
    console.log(`Creating Resume ${resumetitle}`);
    createNewResume(data)
      .then((res) => {
        console.log("Prinitng From AddResume Respnse of Create Resume", res);
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };
  return (
    <>
      <div
        className="glass-card flex flex-col items-center justify-center h-[280px] border-2 border-dashed border-indigo-500/30 rounded-2xl cursor-pointer hover:border-indigo-400/60 hover:bg-indigo-500/5 transition-all duration-500 group"
        onClick={() => setOpenDialog(true)}
      >
        <div className="p-4 rounded-full bg-indigo-500/10 mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
          <CopyPlus className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />
        </div>
        <span className="text-gray-400 font-semibold group-hover:text-white transition-colors">Create New Resume</span>
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent className="glass border-white/10 text-white" setOpenDialog={setOpenDialog}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">Create a New Resume</DialogTitle>
            <DialogDescription className="text-gray-400 pt-2">
              Enter a title for your new AI-powered career document.
              <Input
                className="my-4 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
                type="text"
                placeholder="Ex: Senior Backend Engineer"
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value.trimStart())}
              />
            </DialogDescription>
            <div className="gap-3 flex justify-end mt-4">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl px-6"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 shadow-lg shadow-indigo-500/20"
                onClick={createResume} 
                disabled={!resumetitle || loading}
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
