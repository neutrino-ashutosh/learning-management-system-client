import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student",
    comment:
    "I had the pleasure of exploring DasinAQ, a website that provides an extensive range of courses on various topics. I was thoroughly impressed with my experience, I highly recommend checking out dasinAQ!",
},
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "student",
    comment:
    "Thanks for your amazing website",
},
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "student",
    comment:
    "must explore!"},
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "student",
    comment:
    "good website ",
},
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "student",
    comment:
    "Your content is very special.",
},
  {
    name: "random user",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "student",
    comment:
    "Join dasinAQ! .",
},
];

const Reviews = (props: Props) => {
  return (
  <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
      <div className="800px:w-[50%] w-full">
        <Image
        src={require("../../../public/assests/business-img.png")}
        alt="business"
        width={700}
        height={700}
        />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            This is our team !!
          </p>
        </div>
        <br />
        <br />
       </div>
       <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
            reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
        </div>
  </div>
  );
};

export default Reviews;
