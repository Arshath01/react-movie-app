import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseFetch from "../hooks/fetchHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TicketForm from "../components/TicketForm";

export default function Show() {
  const navigate = useNavigate();
  const { q } = useParams();
  const { loading, data } = UseFetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${q}`
  );

  const [showForm, setShowForm] = useState(false);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const { name, summary, runtime, rating, genres, officialSite, image } = data;

  const cleanSummary = (summary) => {
    return summary ? summary.replace(/<[^>]*>/g, "") : "";
  };

  return (
    <div>
      <header className="bg-gray-800 p-2 fixed w-full">
        <nav className="text-white p-2 space-x-2 text-lg font-semibold container mx-auto">
          <button onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <button className="text-blue-400">{name}</button>
        </nav>
      </header>

      <main className=" py-12 bg-gray-900 min-h-screen text-white">
        <section className="container mx-auto py-8 flex lg:flex-row flex-col  gap-2">
          <img
            src={image && image.medium}
            alt={name}
            className="h-[400px] w-[400px] shadow-lg border rounded-lg"
          />
          <div className="m-4 md:ml-0">
            <h1 className="text-3xl font-semibold mb-4">{name}</h1>
            <p className="text-gray-300">{cleanSummary(summary)}</p>
            <div className="flex items-center mt-4">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{runtime} min</span>
            </div>
            <div className="mt-2">
              {rating ? (
                <h6 className="text-lg">Ratings - {rating.average}</h6>
              ) : (
                <h6>NULL</h6>
              )}
            </div>
            <div className="mt-2">
              <h6>Genres: {genres && genres.join(", ")}</h6>
            </div>
            <div className="mt-2">
              <h6>
                Official Site: <a href={officialSite}>{officialSite}</a>
              </h6>
            </div>

            <button
              className={`mt-4 text-white font-bold py-2 px-4 rounded ${
                !showForm
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              {!showForm ? (
                <span>Book Ticket</span>
              ) : (
                <span>Cancel Booking</span>
              )}
            </button>

            {showForm && <TicketForm name={name} />}
          </div>
        </section>
      </main>
    </div>
  );
}
