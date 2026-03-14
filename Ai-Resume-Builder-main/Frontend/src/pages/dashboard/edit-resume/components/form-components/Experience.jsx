import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateResumeData } from "@/Services/GlobalApi";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: "",
  workSummary: "",
};
function Experience({ resumeInfo, enanbledNext, enanbledPrev }) {
  const [experienceList, setExperienceList] = React.useState(
    resumeInfo?.experience || []
  );
  const [loading, setLoading] = React.useState(false);
  const { resume_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
    } catch (error) {
      console.log("error in experience context update", error.message);
    }
  }, [experienceList]);

  const addExperience = () => {
    if (!experienceList) {
      setExperienceList([formFields]);
      return;
    }
    setExperienceList([...experienceList, formFields]);
  };

  const removeExperience = (index) => {
    const list = [...experienceList];
    const newList = list.filter((item, i) => {
      if (i !== index) return true;
    });
    setExperienceList(newList);
  };

  const handleChange = (e, index) => {
    enanbledNext(false);
    enanbledPrev(false);
    const { name, value } = e.target;
    const list = [...experienceList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setExperienceList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...experienceList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setExperienceList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Experience");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  };
  return (
    <div className="mt-6">
      <div className="">
        <h2 className="font-bold text-2xl text-white tracking-tight">Experience</h2>
        <p className="text-gray-400 mt-1 mb-8 font-medium">Add your previous job experience and achievements.</p>
        <div>
          {experienceList?.map((experience, index) => (
            <div key={index}>
              <div className="flex justify-between my-2">
                <h3 className="font-bold text-lg text-indigo-400">Experience {index + 1}</h3>
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={(e) => {
                    removeExperience(index);
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-6 my-6 rounded-2xl shadow-inner">
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Position Tittle</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="text"
                    name="title"
                    value={experience?.title}
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
                    name="companyName"
                    value={experience?.companyName}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1.5 block">City</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="text"
                    name="city"
                    value={experience?.city}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1.5 block">State</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="text"
                    name="state"
                    value={experience?.state}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1.5 block">StartDate</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="date"
                    name="startDate"
                    value={experience?.startDate}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1.5 block">End Date</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="date"
                    name="endDate"
                    value={experience?.endDate}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={experience?.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                    resumeInfo={resumeInfo}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-6 pt-10 border-t border-white/5">
          <Button
            onClick={addExperience}
            variant="outline"
            className="h-11 px-6 rounded-xl bg-white/5 border-white/10 text-indigo-400 hover:bg-white/10 hover:text-indigo-300 font-semibold transition-all active:scale-95"
          >
            + Add Experience
          </Button>
          <Button 
            onClick={onSave}
            className="h-11 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save Experience"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
