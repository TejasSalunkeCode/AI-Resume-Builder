import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);
  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    // console.log(response.data);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = () => {
    window.print();
  };
  return (
    <>
    <div className="min-h-screen bg-mesh pb-20">
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint" className="w-full">
          <div className="my-12 px-10 md:px-20 lg:px-36 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Congrats! Your Resume is Ready!
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Your AI-optimized career document is complete. Download it now or share the link with your network.
            </p>
            <div className="flex justify-center gap-6 mb-12">
              <Button 
                onClick={HandleDownload}
                className="h-14 px-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Download PDF
              </Button>
              <RWebShare
                data={{
                  text: "Check out my new AI-generated resume!",
                  url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                  title: "My AI Resume",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button 
                   variant="outline"
                   className="h-14 px-12 text-lg bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl backdrop-blur-md transition-all duration-300"
                >
                  Share Link
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div
          className="bg-white shadow-2xl rounded-sm print-area"
          style={{ width: "210mm", height: "auto", minHeight: "297mm" }}
        >
          <div className="print">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ViewResume;
