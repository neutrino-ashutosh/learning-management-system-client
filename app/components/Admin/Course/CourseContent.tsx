import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
      return;
    }

    const lastVideoSection = courseContentData[courseContentData.length - 1]?.videoSection || "";
    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: lastVideoSection,
      videoLength: "",
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    const lastSection = courseContentData[courseContentData.length - 1];
    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
      return;
    }

    setActiveSection(activeSection + 1);
    const newSection = {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: `Untitled Section ${activeSection}`,
      links: [{ title: "", url: "" }],
    };
    setCourseContentData([...courseContentData, newSection]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    const lastSection = courseContentData[courseContentData.length - 1];
    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
      return;
    }
    setActive(active + 1);
    handleCourseSubmit();
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={(e) => e.preventDefault()}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <div className="flex w-full items-center">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BsPencil className="cursor-pointer dark:text-white text-black" />
                </div>
              )}

              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] && item.title && (
                  <p className="font-Poppins dark:text-white text-black">
                    {index + 1}. {item.title}
                  </p>
                )}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className={styles.label}>Video Title</label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      className={`${styles.input}`}
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Url</label>
                    <input
                      type="text"
                      placeholder="Video URL..."
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Length (in minutes)</label>
                    <input
                      type="number"
                      placeholder="20"
                      className={`${styles.input}`}
                      value={item.videoLength}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoLength = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Description</label>
                    <textarea
                      rows={8}
                      placeholder="Description..."
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex !== 0 && handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source Code... (Link title)"
                        className={`${styles.input}`}
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="Source Code URL... (Link URL)"
                        className={`${styles.input} mt-6`}
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  <div className="mb-5">
                    <button
                      className={`${styles.button} flex items-center`}
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2 text-black dark:text-white" />
                      Add Link
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <div className="flex w-full items-center justify-between mt-5">
          <button
            type="button"
            className={styles.button}
            onClick={prevButton}
          >
            Previous
          </button>

          <button
            type="button"
            className={`${styles.button} flex items-center`}
            onClick={addNewSection}
          >
            <AiOutlinePlusCircle className="mr-2 text-black dark:text-white" />
            Add Section
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={handleOptions}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
