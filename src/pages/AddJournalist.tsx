import React, { FC, useRef, ChangeEvent, useState } from "react";

interface AddJournalistType {
  first_name: string;
  last_name: string;
  position: string;
  course: string;
  photo: string;
}

const AddJournalist: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [journalistDetails, setJournalistDetails] = useState<AddJournalistType>(
    {
      first_name: "",
      last_name: "",
      position: "",
      course: "",
      photo: "",
    }
  );
  const [photos, setPhotos] = useState<Array<string>>([]);

  const textInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJournalistDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const fileInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setPhotos((prevPhotos: any) => [...prevPhotos, reader.result]);
      };
    }
  };
  const addArticle = async () => {
    const response = await fetch("http://localhost:5000/journalists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...journalistDetails,
        photo: [...photos][0],
      }),
    });
    const data = await response.json();
    console.log(data, "response");
  };
  return (
    <div>
      <input
        name="first_name"
        type="text"
        placeholder="First Name"
        value={journalistDetails.first_name}
        onChange={textInputHandler}
      />
      <input
        name="last_name"
        type="text"
        placeholder="Last Name"
        value={journalistDetails.last_name}
        onChange={textInputHandler}
      />
      <input
        name="course"
        type="text"
        placeholder="Course"
        value={journalistDetails.course}
        onChange={textInputHandler}
      />
      <input
        name="position"
        type="text"
        placeholder="Position"
        value={journalistDetails.position}
        onChange={textInputHandler}
      />
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={fileInputHandler}
      />
      <div
        style={{
          padding: "10px",
          height: "100px",
          width: "250px",
          border: "1px solid black",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {photos.map((photo) => (
          <div
            style={{ height: "100%", width: "70px" }}
            key={photo.substring(0, photo.length - 100)}
          >
            <img src={photo} style={{ height: "100%", width: "100%" }} />
          </div>
        ))}
      </div>
      <button onClick={addArticle}>Add Article</button>
    </div>
  );
};

export default AddJournalist;
