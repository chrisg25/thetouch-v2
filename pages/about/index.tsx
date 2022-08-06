import Image from "next/image";
import React from "react";

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
      <h1 className="about__grid-title">Editorial Board</h1>
      <section className="about__members-grid">
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
          <h1 className="about__member-name">Shaira Heart B. Degrano</h1>
          <h3 className="about__member-position">Assistant Editor-in-Chief</h3>
        </div>
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
          <h1 className="about__member-name">Hizelle Grace K. Egera</h1>
          <h3 className="about__member-position">Secretary</h3>
        </div>
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
          <h1 className="about__member-name">Teresito D. Rapal Jr.</h1>
          <h3 className="about__member-position">News Editor</h3>
        </div>
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
          <h1 className="about__member-name">Meramolin A. Babor</h1>
          <h3 className="about__member-position">Feature Editor</h3>
        </div>
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
          <h1 className="about__member-name">Jesbelle D. Samoranos</h1>
          <h3 className="about__member-position">Social Media Manager</h3>
        </div>
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
          <h1 className="about__member-name">Joshua I. Barlolong</h1>
          <h3 className="about__member-position">
            Graphics, Photos and Arts Unit Head{" "}
          </h3>
        </div>
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
          <h1 className="about__member-name">Rhyz Jovanni Arong</h1>
          <h3 className="about__member-position">Website Unit Head</h3>
        </div>
      </section>
    </div>
  );
};

export default About;
