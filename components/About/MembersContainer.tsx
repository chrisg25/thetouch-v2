import React from "react";
import Image from "next/image";

const MembersContainer = () => {
  return (
    <>
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
    </>
  );
};

export default MembersContainer;
