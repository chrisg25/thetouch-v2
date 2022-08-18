import React from "react";
import Image from "next/image";

import { MemberType } from "../../types";
import { NextPage } from "next";

const MemberCard: NextPage<MemberType> = ({ image, name, position }) => {
  return (
    <div className="about__member">
      <div className="about__member-image-container">
        <Image
          src={
            "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          }
          width={180}
          height={180}
          alt={"person"}
          layout="responsive"
        />
      </div>
      <h1 className="about__member-name">Marielle G. Asanuddin</h1>
      <h3 className="about__member-position">Editor-in-Chief</h3>
    </div>
  );
};

export default MemberCard;
