import classes from "./CreateImage.module.css";
import { surpriseMePrompts } from "components/prompts";
import { useState } from "react";
const CreateImage = () => {
  const [imageSource, setimageSource] = useState(null);
  const [surpriseMePrompt, setsurpriseMePrompt] = useState([]);
  const [writtenPrompt, setWrittenPrompt] = useState(null);
  const [enteredName, setEnteredName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 
  const promptChangeHandler = (e) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    if (surpriseMePrompts[randomIndex] === surpriseMePrompt)
      return promptChangeHandler();
    else {
      setsurpriseMePrompt(surpriseMePrompts[randomIndex]);
      setWrittenPrompt(surpriseMePrompts[randomIndex]);
    }
  };
  const imageGenerateHandler = async (e) => {
    e.preventDefault();
    console.log("Generating image");
    setIsLoading(true);
    // send request to backend including the name and the written prompt to 
    // generate the image
    const response = await fetch('api/generate_image',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name:enteredName,
            prompt: writtenPrompt
        })
    })
    const imageData = await response.json();
    setimageSource(imageData.photo);
    setIsLoading(false);
  };
  return (
    <div className={classes.container}>
      <h1 style={{ fontSize: "2rem" }}>Create</h1>
      <p style={{ color: "grey", marginTop: "0.8rem" }}>
        Create an Imaginative image through DALL-E and share it with the
        community
      </p>
      <div className={classes.formSeparator}>
        <form onSubmit={imageGenerateHandler} className={classes.formContainer}>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setEnteredName(e.target.value)}
            className={classes.formInput}
            style={{
                color:'black',
              padding: "0.4rem 0.5rem",
              outline: "none",
              border: "1px solid grey",
              borderRadius: "0.4rem",
              background: "transparent",
            }}
          />
          <div className={classes.formPromptContainer}>
            <label>Prompt</label>
            <button
              style={{ marginLeft: "1rem" }}
              type="button"
              className={classes.btn}
              onClick={promptChangeHandler}
            >
              Surpise Me
            </button>
          </div>
          <input
            type="text"
            placeholder="enter your prompt"
            className={classes.formInput}
            onChange={(e) => setWrittenPrompt(e.target.value)}
            style={{
                color:'black',
              padding: "0.4rem 0.5rem",
              outline: "none",
              border: "1px solid grey",
              borderRadius: "0.4rem",
              background: "transparent",
            }}
            value={writtenPrompt || surpriseMePrompt && surpriseMePrompt}
          />
          <button
            type="submit"
            className={classes.btn}
            style={{ marginTop: "1.5rem" }}
          >
            {isLoading?"Loading...":"Generate"}
          </button>
        </form>
      </div>
      <div className={classes.imageContainer}>
        {imageSource ? (
          <img src={`data:image/png;base64,`+imageSource} />
        ) : (
          <img src={"assets/preview.png"} />
        )}
      </div>

    </div>
  );
};

export default CreateImage;
