import React, { use } from "react";
import { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import NewPostInput from "../modules/NewPostInput";
import SingleAiMessage from "../modules/SingleAiMessage";
const Ai = () => {
  const genAI = new GoogleGenerativeAI("AIzaSyBCO5jFTl5tu0JIys2SzVmZOfTPXE-MW3w");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [aiReply, setAiReply] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const lineByLine = (responseText) => {
    let index = 0;
    setAiReply("");
    const interval = setInterval(() => {
      setAiReply((prev) => prev + responseText.charAt(index++));

      if (index >= responseText.length - 1) {
        clearInterval(interval);
        setAiMessages((prevMessages) => [...prevMessages, {
          type: "ai",
          content: responseText}]);
        setAiReply("");
      }
    }, 50);
  };

  const Reply = async (value) => {
    try {
      const prompt = value;
      setAiMessages((prevMessages) => [...prevMessages, {
        type: "user",
        content: value}]);
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      lineByLine(responseText);
      console.log(result.response.text());
      console.log(typeof result.response.text());
    } catch (error) {
      console.error("Error generating AI response:", error);
      // 错误处理
      setAiMessages((prev) => [...prev, "Sorry, there was an error generating the response."]);
    }
  };

  return (
    <div>
      <NewPostInput defaultText="Talk to AI..." onSubmit={Reply}></NewPostInput>

      {aiMessages.map((replyObj) => {
        return <SingleAiMessage type={replyObj.type} reply={replyObj.content}></SingleAiMessage>;
      })}
      {aiReply && <SingleAiMessage reply={aiReply} />}
    </div>
  );
};

export default Ai;
