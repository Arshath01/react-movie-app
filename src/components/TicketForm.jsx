import React, { useState } from "react";

export default function TicketForm({ name }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userEmail", userEmail);

    setUserName("");
    setUserEmail("");
    setSuccessMessage("Your ticket has been booked successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      <form
        className="mt-4 p-4 bg-slate-200 flex flex-col space-y-2 rounded-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2  flex-col">
          <h1>{name}</h1>
          <h1 className="text-blue-500">Book Ticket</h1>
        </div>

        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          name="userEmail"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Submit
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
}
