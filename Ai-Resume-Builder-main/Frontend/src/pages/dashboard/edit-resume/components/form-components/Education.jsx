import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateResumeData } from "@/Services/GlobalApi";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};
function Education({ resumeInfo, enanbledNext }) {
  const [educationalList, setEducationalList] = React.useState(
    resumeInfo?.education || [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    if (educationalList.length === 0) {
      return toast("Please add atleast one education", "error");
    }
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Education");
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

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationalList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setEducationalList(list);
  };

  return (
    <div className="mt-6">
      <div className="">
        <h2 className="font-bold text-2xl text-white tracking-tight">Education</h2>
        <p className="text-gray-400 mt-1 mb-8 font-medium">List your educational background and qualifications.</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-6 my-6 rounded-2xl shadow-inner">
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">University Name</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Degree</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Major</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Start Date</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">End Date</label>
                <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Grade</label>
                <div className="flex justify-center items-center gap-4">
                  <select
                    name="gradeType"
                    className="py-2 px-4 rounded-md"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.gradeType}
                  >
                    <option value="CGPA">CGPA</option>
                    <option value="GPA">GPA</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                  <Input
                  className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:ring-indigo-500"
                    type="text"
                    name="grade"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.endDate}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-400 mb-1.5 block">Description</label>
                <Textarea
                  name="description"
                  className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-indigo-500"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between py-6 pt-10 border-t border-white/5">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="h-11 px-5 rounded-xl bg-white/5 border-white/10 text-indigo-400 hover:bg-white/10 hover:text-indigo-300 font-semibold transition-all active:scale-95"
          >
            + Add
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="h-11 px-5 rounded-xl bg-white/5 border-white/10 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-semibold transition-all active:scale-95"
          >
            Remove
          </Button>
        </div>
        <Button 
            disabled={loading} 
            onClick={() => onSave()}
            className="h-11 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save Education"}
        </Button>
      </div>
      </div>
    </div>
  );
}

export default Education;
