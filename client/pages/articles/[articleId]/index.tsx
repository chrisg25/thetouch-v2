import { NextPage } from "next";
import Image from "next/image";
import React from "react";

const ArticleDetails: NextPage = ({}) => {
  return (
    <div className="article-details">
      <section className="article-details__header">
        <div className="article-details__title-and-writer">
          <h1 className="article-details__title">
            NEWS | Engr. Honculada on reviving pub
          </h1>
          <p className="article-details__writer">by Lester Janito</p>
        </div>
        <p className="article-details__date">November 14, 2021 - 10:42 PM</p>
      </section>
      <hr />
      <section className="article-details__body">
        <div className="article-details__body-photo-container">
          <Image
            src={
              "https://res.cloudinary.com/rhyzschoolwebapp/image/upload/v1636901327/thetouchpub_article_banners/hzwdhenys1uyqjsibokc.jpg"
            }
            height={379}
            width={379}
            alt="featured photo"
            className="article-details__body-photo"
          />
          <p>by Graphics Artist</p>
        </div>
        <p className="article-details__body-content">
          Angel Honculada, a licensed geothermal engineer and an instructor at
          the College of Engineering and Architecture (CEA), let out intentions
          of initiating the re-birth of The TOUCH. In an interview with The
          TOUCH, Engr. Honculada cited that since the onset of covid-19, the
          college&apos;s faculty and staff have felt the need for an outlet in
          disseminating information. &quot;The college cannot cater all the
          concerns of the students,&quot;he said. He furthered that when Vence
          Megio, incumbent President of Negros Oriental State University -
          Student Government of Dumaguete City Campus II (NORSU-SGDC II),
          discussed to him the initial plans on reviving the publication, he
          immediately responded to the initiative. “In this pandemic, the pub
          will really help students kay naa tay clear venue for announcements
          diri sa CEA and it will help the college”, he explained. Aside from
          the aforementioned reason, Engr. Angel Honculada stated that the
          revival of The TOUCH will help the publication&apos;s staff hone their
          journalism skills. “Nakita nako na daghang engineering ang apil sa
          journalism.
        </p>
        <p className="article-details__body-content">
          It [The TOUCH Publication] will develop and can show the other side of
          engineering students,&quot; he exclaimed. Angel Honculada, a licensed
          geothermal engineer and an instructor at the College of Engineering
          and Architecture (CEA), let out intentions of initiating the re-birth
          of The TOUCH. In an interview with The TOUCH, Engr. Honculada cited
          that since the onset of covid-19, the college&apos;s faculty and staff
          have felt the need for an outlet in disseminating information.
          &quot;The college cannot cater all the concerns of the
          students,&quot;he said. He furthered that when Vence Megio, incumbent
          President of Negros Oriental State University - Student Government of
          Dumaguete City Campus II (NORSU-SGDC II), discussed to him the initial
          plans on reviving the publication, he immediately responded to the
          initiative. “In this pandemic, the pub will really help students kay
          naa tay clear venue for announcements diri sa CEA and it will help the
          college”, he explained. Aside from the aforementioned reason, Engr.
          Angel Honculada stated that the revival of The TOUCH will help the
          publication&apos;s staff hone their journalism skills. “Nakita nako na
          daghang engineering ang apil sa journalism. It [The TOUCH Publication]
          will develop and can show the other side of engineering
          students,&quot; he exclaimed.
        </p>
      </section>
    </div>
  );
};

export default ArticleDetails;
