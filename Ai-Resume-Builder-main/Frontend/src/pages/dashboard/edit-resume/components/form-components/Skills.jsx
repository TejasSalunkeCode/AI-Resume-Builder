import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function Skills({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = React.useState(false);
  const [skillsList, setSkillsList] = React.useState(
    resumeInfo?.skills || [
      {
        name: "",
        rating: 0,
      },
    ]
  );
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
    } catch (error) {
      console.log("error in experience context update", error);
    }
  }, [skillsList]);

  const AddNewSkills = () => {
    const list = [...skillsList];
    list.push({ name: "", rating: 0 });
    setSkillsList(list);
  };

  const RemoveSkills = () => {
    const list = [...skillsList];
    list.pop();
    setSkillsList(list);
  };

  const handleChange = (index, key, value) => {
    const list = [...skillsList];
    const newListData = {
      ...list[index],
      [key]: value,
    };
    list[index] = newListData;
    setSkillsList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    if (resume_id) {
      console.log("Started Updating Skills");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="mt-6">
      <div className="">
        <h2 className="font-bold text-2xl text-white tracking-tight">Skills</h2>
        <p className="text-gray-400 mt-1 mb-8 font-medium">Add your top professional key skills and proficiency levels.</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-4 bg-white/5 border border-white/10 p-4 rounded-xl shadow-inner group"
          >
            <div className="flex-1 mr-6">
              <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Skill Name</label>
              <Input
                className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500 w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between py-6 pt-10 border-t border-white/5">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="h-11 px-5 rounded-xl bg-white/5 border-white/10 text-indigo-400 hover:bg-white/10 hover:text-indigo-300 font-semibold transition-all active:scale-95"
          >
            + Add
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="h-11 px-5 rounded-xl bg-white/5 border-white/10 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-semibold transition-all active:scale-95"
          >
            Remove
          </Button>
        </div>
        <Button 
            disabled={loading} 
            onClick={onSave}
            className="h-11 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save Skills"}
        </Button>
      </div>
      </div>
    </div>
  );
}

export default Skills;
