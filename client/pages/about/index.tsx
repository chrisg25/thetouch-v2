import Image from "next/image";
import React from "react";
import MembersContainer from "../../components/About/MembersContainer";

const About = () => {
  return (
    <div className="about">
      <section className="about__description">
        <h1 className="about__description-title">ABOUT US</h1>
        <p className="about__description-content">
          The TOUCH is the official active working student publication of Negros
          Oriental State University’s College of Engineering and Architecture.
          It was established in the year 1994 by one of the co-founder, the late
          Prof. Rhodora Cleope, together with an in-hand support formed by a
          dedicated group of students who shared the same passion to help create
          a change. The last active year of the publication was the 1st quarter
          of 2017. This was supervised by Engr. Johann Heinrich P. Malongo, the
          former publication adviser together with the following student
          officers namely: Liza Marie E. Ragusta (EIC), John Reynald L. Narciso
          (AEIC), Marie Conception D. Salatan (SS), Myra Mae Que (BM), Francis
          Hiro Leduna (AGE I), Jocelyn Quibido (FE), Karen Eve Lugo (ABM), Rhea
          Ramirez (AGE II), John Dominique Bayate (LE), Janine Somoza (NE). The
          TOUCH was left since then and died in a natural response due to a list
          of concerns. Numerous students had forgotten the existing pub until
          this year 2021, another group of students decided to revive the
          dormant publication. The movement was spearheaded by Syriyl Mae Degamo
          Mapili, a fifth year computer engineering student and former The
          NORSUnian Editor-in-Chief and Vence Neil Acampado Megio, a fifth year
          computer engineering student, Negros Oriental State University –
          Student Government of Dumaguete City Main Campus II (NORSU-SGDC II)
          Governor (2018-2019) and President (2019-2021). It was also inspired
          by Engr. Angel Honculada, the newly appointed graphics adviser who has
          the same vision of uprising the organization.
        </p>
      </section>
      <MembersContainer />
      <MembersContainer />
      <MembersContainer />
    </div>
  );
};

export default About;
