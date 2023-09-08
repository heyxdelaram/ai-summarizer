import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/text";

const Demo = () => {
  const [text, setText] = useState({
    url: "",
    summary: "",
  });

  const [allTexts, setAllTexts] = useState([]);
  //since the hook is lazy, the first param is a function for getting the content and the secon is an object which we can get the error and the state of the request by destructuring it
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  //dependency array gets executed at the start of the application
  useEffect(() => {
    const textFromLocalStorage = JSON.parse(localStorage.getItem("texts"));

    if (textFromLocalStorage) setAllTexts(textFromLocalStorage);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //todo: api req
    const data = await getSummary({ textUrl: text.url });

    if (data?.summary) {
      const newText = { ...text, summary: data.summary };
      const newAllText = [...allTexts, newText];
      setText(newText);
      setAllTexts(newAllText);
      localStorage.setItem("texts", JSON.stringify(newAllText));
      console.log(newText);
    }
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allTexts.map((text, i) => (
            <div
              key={`link-${i}`}
              className="link_card"
              onClick={() => setText(text)}
            >
              <div className="copy_btn">
                <img
                  src="copy"
                  className="w-[40%] h-[40%] object-contain"
                  alt="copy-icon"
                />
                <p className="flex-1 font-satoshi text-blue-700 text-sm truncate">
                  {item.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*Display results*/}

      <div
        className="my-10
      max-w-full flex justify-center items-center"
      >
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          text.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Text <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p>{text.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
