import React from "react";
import MemberCard from "./MemberCard";

const MembersContainer = () => {
  return (
    <>
      <h1 className="about__grid-title">Editorial Board</h1>
      <section className="about__members-grid">
        <MemberCard
          image="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          name="Marielle G. Asanuddin"
          position="Editor-in-Chief"
        />
      </section>
    </>
  );
};

export default MembersContainer;
