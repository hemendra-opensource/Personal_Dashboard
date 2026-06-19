import React, { useState, useEffect } from "react";

export default function Dashboard() {
  // STATES
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const [time, setTime] = useState(1500); // 25 min
  const [isRunning, setIsRunning] = useState(false);

  const [streak, setStreak] = useState(0);

  // TIMER LOGIC
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // HANDLERS
  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  const addGoal = () => {
    if (!goalInput.trim()) return;
    setGoals([...goals, goalInput]);
    setGoalInput("");
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, noteInput]);
    setNoteInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2">Personal Dashboard</h1>
      <p className="text-gray-600 mb-6">
        {new Date().toDateString()}
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* TASKS */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>

          <div className="flex gap-2 mb-2">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button
              onClick={addTask}
              className="bg-black text-white px-3 rounded"
            >
              +
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks yet. Add one to get started!
            </p>
          ) : (
            <ul className="list-disc pl-5">
              {tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>

        {/* GOALS */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Goals</h2>

          <div className="flex gap-2 mb-2">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Add a new goal..."
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
            />
            <button
              onClick={addGoal}
              className="bg-black text-white px-3 rounded"
            >
              +
            </button>
          </div>

          {goals.length === 0 ? (
            <p className="text-gray-500">
              No goals yet. Set one to start tracking!
            </p>
          ) : (
            <ul className="list-disc pl-5">
              {goals.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          )}
        </div>

        {/* POMODORO */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Pomodoro Timer</h2>

          <p className="text-2xl font-bold mb-3">{formatTime()}</p>

          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(true)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Start
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTime(1500);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        {/* HABIT STREAK */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Habit Streak</h2>

          <p className="text-lg">🔥 {streak}</p>
          <p className="text-gray-600 mb-2">Days in a row!</p>

          <button
            onClick={() => setStreak(streak + 1)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Complete Today
          </button>
        </div>

        {/* NOTES */}
        <div className="bg-white p-4 rounded-2xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Quick Notes</h2>

          <div className="flex gap-2 mb-2">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Write a quick note..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <button
              onClick={addNote}
              className="bg-black text-white px-3 rounded"
            >
              +
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="text-gray-500">
              No notes yet. Jot something down!
            </p>
          ) : (
            <ul className="list-disc pl-5">
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}