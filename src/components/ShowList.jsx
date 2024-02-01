import React from "react";
import UseFetch from "../hooks/fetchHooks";
import { useNavigate } from "react-router-dom";

export default function ShowList() {
  const { loading, data } = UseFetch(
    "https://api.tvmaze.com/search/shows?q=all"
  );
  if (!data) {
    console.log("data not found");
    return;
  }

  const navigate = useNavigate();

  const image = data.map(
    ({ show }) =>
      show.image !== null && {
        template: show.image.medium,
        showTitle: show.name,
        language: show.language,
        type: show.type,
        status: show.status,
      }
  );

  return (
    <section className=" bg-gray-900 py-4  lg:px-8 lg:py-4">
      <div className="container mx-auto shadow-lg grid lg:grid-cols-4 md:grid-cols-2 ">
        {image &&
          image.map(
            ({ template, showTitle, language, type, status }, index) =>
              template && (
                <div className="rounded-md p-2 lg:w-full w-[90%] mx-auto">
                  <img
                    src={template}
                    alt="show-preview"
                    className="h-[350px] lg:h-[300px] md:h-[300px] w-full rounded-t-lg"
                    key={index}
                  />
                  <section className="p-3  bg-slate-800 text-white rounded-b-lg space-y-2">
                    <div className="flex justify-between items-center ">
                      <h2 className="font-bold uppercase">{showTitle}</h2>
                      <p className="font-bold">{language}</p>
                    </div>
                    <h3 className="font-semibold ">{type}</h3>
                    <div className="flex lg:flex-col lg:gap-0 items-center gap-2">
                      <div
                        className={`w-full text-center text-white uppercase font-bold rounded-md p-2 ${
                          status === "Running" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {status}
                      </div>

                      <button
                        onClick={() => navigate(`/shows/${showTitle}`)}
                        className="my-2 p-2  bg-blue-500 rounded-md w-full text-white  font-bold uppercase"
                      >
                        Details
                      </button>
                    </div>
                  </section>
                </div>
              )
          )}
      </div>
    </section>
  );
}
