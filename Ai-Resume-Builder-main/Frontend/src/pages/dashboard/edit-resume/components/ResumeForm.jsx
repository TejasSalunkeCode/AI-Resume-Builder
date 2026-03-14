import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    if (currentIndex === 0) {
      setEnabledPrev(false);
    } else if (currentIndex == 1) {
      setEnabledPrev(true);
    } else if (currentIndex === 4) {
      setEnabledNext(true);
    } else if (currentIndex === 5) {
      setEnabledNext(false);
    }
  }, [currentIndex]);

  // To Add Dummy Data
  // useEffect(() => {
  //   dispatch(addResumeData(data));
  // }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="glass p-4 rounded-2xl flex justify-between items-center border border-white/10">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard">
            <Button variant="outline" className="h-11 w-11 p-0 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white shadow-none">
              <HomeIcon className="w-5 h-5" />
            </Button>
          </Link>
          <ThemeColor resumeInfo={resumeInfo}/> 
        </div>
        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-11 px-5 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white shadow-none font-semibold gap-2 transition-all active:scale-95"
              disabled={!enanbledPrev}
              onClick={() => {
                if (currentIndex === 0) return;
                setCurrentIndex(currentIndex - 1);
              }}
            >
              <ArrowLeft className="w-4 h-4" /> Prev
            </Button>
          )}
          {currentIndex < 5 && (
            <Button
              size="sm"
              className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              disabled={!enanbledNext}
              onClick={() => {
                if (currentIndex >= 5) return;
                setCurrentIndex(currentIndex + 1);
              }}
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
      {currentIndex === 0 && (
        <PersonalDetails
          resumeInfo={resumeInfo}
          enanbledNext={setEnabledNext}
        />
      )}
      {currentIndex === 1 && (
        <Summary
          resumeInfo={resumeInfo}
          enanbledNext={setEnabledNext}
          enanbledPrev={setEnabledPrev}
        />
      )}
      {currentIndex === 2 && (
        <Experience
          resumeInfo={resumeInfo}
          enanbledNext={setEnabledNext}
          enanbledPrev={setEnabledPrev}
        />
      )}
      {currentIndex === 3 && (
        <Project
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}
      {currentIndex === 4 && (
        <Education
          resumeInfo={resumeInfo}
          enanbledNext={setEnabledNext}
          enabledPrev={setEnabledPrev}
        />
      )}
      {currentIndex === 5 && (
        <Skills
          resumeInfo={resumeInfo}
          enanbledNext={setEnabledNext}
          enanbledPrev={setEnabledNext}
        />
      )}
      </div>
    </div>
  );
}

export default ResumeForm;
