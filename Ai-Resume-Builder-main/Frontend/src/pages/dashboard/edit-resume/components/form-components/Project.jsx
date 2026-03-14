import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import SimpeRichTextEditor from "@/components/custom/SimpeRichTextEditor";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  projectName: "",
  techStack: "",
  projectSummary: "",
};
function Project({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const [projectList, setProjectList] = useState(resumeInfo?.projects || []);
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, projects: projectList }));
  }, [projectList]);

  const addProject = () => {
    setProjectList([...projectList, formFields]);
  };

  const removeProject = (index) => {
    const list = [...projectList];
    const newList = list.filter((item, i) => {
      if (i !== index) return true;
    });
    setProjectList(newList);
  };

  const handleChange = (e, index) => {
    setEnabledNext(false);
    setEnabledPrev(false);
    console.log("Type: ", typeof setEnabledPrev);
    const { name, value } = e.target;
    const list = [...projectList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setProjectList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...projectList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setProjectList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        projects: projectList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Project");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          setEnabledNext(true);
          setEnabledPrev(true);
          setLoading(false);
        });
    }
  };

  return (
    <div className="mt-6">
      <div className="">
        <h2 className="font-bold text-2xl text-white tracking-tight">Project</h2>
        <p className="text-gray-400 mt-1 mb-8 font-medium">Highlight your best personal or professional projects.</p>
      <div>
        {projectList?.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between my-2">
              <h3 className="font-bold text-lg">Project {index + 1}</h3>
              <Button
                variant="outline"
                className="text-red-500"
                onClick={(e) => {
                  removeProject(index);
                }}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-6 my-6 rounded-2xl shadow-inner">
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Project Name</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  type="text"
                  name="projectName"
                  value={project?.projectName}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Company Name</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  type="text"
                  name="techStack"
                  value={project?.techStack}
                  placeholder="React, Node.js, Express, MongoDB"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                />
              </div>
              <div className="col-span-2">
                <SimpeRichTextEditor
                  index={index}
                  defaultValue={project?.projectSummary}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "projectSummary", index)
                  }
                  resumeInfo={resumeInfo}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between py-6 pt-10 border-t border-white/5">
        <Button onClick={addProject} variant="outline" className="h-11 px-6 rounded-xl bg-white/5 border-white/10 text-indigo-400 hover:bg-white/10 hover:text-indigo-300 font-semibold transition-all active:scale-95">
          + Add Project
        </Button>
        <Button 
            onClick={onSave}
            className="h-11 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save Projects"}
        </Button>
      </div>
      </div>
    </div>
  );
}

export default Project;
