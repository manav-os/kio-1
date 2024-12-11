'use client'
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState("");
	
  async function handleResponse() {
    try {
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({topic})
      });
      
      const data = await res.json();
      setCourse(data.message.choices[0].message.content);

    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    handleResponse();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a topic"
          className="border-2 border-slate-900 w-64 h-10 p-5 text-black"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className="border px-4 py-2 bg-green-600" type="submit">
          Submit
        </button>
      </form>

      {course && <div>{course}</div>}
    </>
  );
}