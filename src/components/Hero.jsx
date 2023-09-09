import React from "react";
import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex w-full mb-10 pt-3 justify-between items-center">
        <img src={logo} alt="sumz-logo" />
        <button
          onClick={() =>
            window.open("https://github.com/heyxdelaram/ai-summarizer.git")
          }
          className="black_btn"
          type="button"
        >
          Github
        </button>
      </nav>
      <h2 className="head_text">
        Summarize Long Text with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h2>
      <h3 className="desc">
        Simplify your reading with Sumz, an open-source article summarizer that
        transforms lengthy text into clear and concise summaries
      </h3>
    </header>
  );
};

export default Hero;
