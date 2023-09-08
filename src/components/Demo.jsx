import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
const Demo = () => {
  const [text, setText] = useState({
    url: "",
    summary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //api req
    alert("clicked");
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/*Search */}

      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 ml-3 w-5 my-2 "
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={text.url}
            onChange={(e) => setText({ ...text, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↩
          </button>
        </form>
        {/*browse url history*/}
      </div>
      {/*Display results*/}
    </section>
  );
};

export default Demo;
