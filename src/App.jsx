// src/App.jsx
import React, { useMemo, useState } from "react";

const BRAND_RED = "#C8102E"; // IFIC red
const ACCENT_BLUE = "#0078D7";

const sampleCourses = [
  { id: 1, title: "AML & KYC Basics", trainer: "Compliance", duration: "2h", status: "Active" },
  { id: 2, title: "Cybersecurity Awareness", trainer: "IT Division", duration: "1.5h", status: "Active" },
  { id: 3, title: "Information Security Policy", trainer: "IT Division", duration: "1h", status: "Active" },
  { id: 4, title: "Fraud Risk Management", trainer: "Risk", duration: "2h", status: "Active" },
  { id: 5, title: "Customer Service Excellence", trainer: "HR", duration: "1h", status: "Active" },
  { id: 6, title: "Core Banking Ops 101", trainer: "Operations", duration: "2h", status: "Active" }
];

function Nav({ page, setPage }) {
  const Item = ({ to, children }) => (
    <button
      onClick={() => setPage(to)}
      className={`px-3 py-1.5 rounded-full text-sm border transition shadow-sm hover:shadow ${
        page === to ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-900 border-slate-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold tracking-wide" style={{ color: BRAND_RED }}>
          IFIC <span className="opacity-90">SmartLearn</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Item to="welcome">Welcome</Item>
          <Item to="login">Login</Item>
          <Item to="dashboard">Dashboard</Item>
          <Item to="courses">Courses</Item>
          <Item to="certificate">Certificate</Item>
          <Item to="admin">Admin</Item>
        </div>
      </div>
    </nav>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(900px_900px_at_15%_-10%,#FFE6EA_0%,rgba(255,230,234,0)_60%),radial-gradient(900px_900px_at_120%_20%,#E7F0FF_0%,rgba(231,240,255,0)_55%)]">
      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}

function Welcome({ setPage }) {
  return (
    <div className="min-h-[70vh] grid place-items-center text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-semibold" style={{ color: BRAND_RED }}>IFIC SmartLearn</h1>
        <p className="text-slate-600">Empowering Every IFIC Employee to Learn, Grow, and Excel</p>
        <button
          onClick={() => setPage("login")}
          className="px-5 py-2.5 rounded-xl text-white font-semibold shadow hover:shadow-lg transition"
          style={{ background: BRAND_RED }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

function Login({ setPage }) {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="bg-white border border-slate-200 rounded-2xl shadow p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: BRAND_RED }}>Login to IFIC SmartLearn</h2>
        <input className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Email" />
        <input type="password" className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Password" />
        <select className="w-full mb-4 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200">
          <option>Employee</option>
          <option>Trainer</option>
          <option>Admin</option>
        </select>
        <button onClick={() => setPage("dashboard")} className="w-full px-4 py-2.5 rounded-xl text-white font-semibold shadow" style={{ background: BRAND_RED }}>
          Login
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full h-2 rounded-full bg-slate-200 mt-2">
      <div className="h-2 rounded-full" style={{ width: `${value}%`, background: BRAND_RED }} />
    </div>
  );
}

function Dashboard({ setPage, setSelectedCourse }) {
  const rec = sampleCourses.slice(0, 3);
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Welcome, Abrar</h1>
      <p className="text-slate-600">Your learning progress</p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow p-4 my-4">
        <div className="flex items-center justify-between">
          <strong>Overall Progress</strong>
          <span className="text-slate-600">3/8 completed</span>
        </div>
        <ProgressBar value={38} />
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <h3 className="text-lg font-semibold">Recommended</h3>
        <button onClick={() => setPage("courses")} className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: ACCENT_BLUE }}>
          View All Courses
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rec.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-slate-600 text-sm">{c.trainer} • {c.duration}</p>
            <button
              onClick={() => { setSelectedCourse(c); setPage("course"); }}
              className="mt-3 px-4 py-2 rounded-lg text-white font-medium"
              style={{ background: BRAND_RED }}
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Courses({ setPage, setSelectedCourse }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => sampleCourses.filter(c => (c.title + c.trainer).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <div>
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mt-2">Available Courses</h1>
          <p className="text-slate-600">Browse assigned and recommended modules</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses…"
          className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-slate-600 text-sm">{c.trainer} • {c.duration}</p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-full px-3 py-1 font-semibold">
              {c.status}
            </div>
            <button
              onClick={() => { setSelectedCourse(c); setPage("course"); }}
              className="mt-3 px-4 py-2 rounded-lg text-white font-medium"
              style={{ background: ACCENT_BLUE }}
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseDetails({ course, setPage }) {
  if (!course) return <p className="text-slate-600">Select a course to continue.</p>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Course: {course.title}</h1>
      <p className="text-slate-600">{course.trainer} • {course.duration}</p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow grid place-items-center h-80 my-4">
        <span className="text-slate-500">📺 Video Placeholder</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow p-3 flex gap-3 mb-4 text-sm">
        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-100 font-semibold">Overview</span>
        <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-800 border border-slate-200">Materials</span>
        <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-800 border border-slate-200">Quiz</span>
      </div>

      <button
        onClick={() => setPage("certificate")}
        className="px-4 py-2 rounded-lg text-white font-medium"
        style={{ background: BRAND_RED }}
      >
        Mark as Complete
      </button>
    </div>
  );
}

function Certificate({ setPage }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow p-6">
        <h1 className="text-center text-3xl font-semibold mb-2">Certificate of Completion</h1>
        <p className="text-center text-slate-700">
          This is to certify that <strong>[Employee Name]</strong><br />
          has successfully completed the course <strong>[Course Title]</strong>.
        </p>
        <div className="flex items-center justify-between mt-10 text-slate-700">
          <div>Signature: ____________</div>
          <div>Date: __ / __ / ____</div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: ACCENT_BLUE }}>
            Download
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => setPage("dashboard")}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-900"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function Admin() {
  const rows = [
    { id: 1, title: "AML & KYC Basics", trainer: "Compliance", duration: "2h", status: "Active" },
    { id: 2, title: "Cybersecurity Awareness", trainer: "IT Division", duration: "1.5h", status: "Active" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Admin Panel</h1>

      <div className="bg-white border border-slate-200 rounded-2xl shadow p-4 flex items-center justify-between my-4">
        <strong>Course Management</strong>
        <button className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: BRAND_RED }}>
          + Add New Course
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-600">
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Course</th>
              <th className="px-4 py-3 border-b">Trainer</th>
              <th className="px-4 py-3 border-b">Duration</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 border-b">{r.id}</td>
                <td className="px-4 py-3 border-b">{r.title}</td>
                <td className="px-4 py-3 border-b">{r.trainer}</td>
                <td className="px-4 py-3 border-b">{r.duration}</td>
                <td className="px-4 py-3 border-b">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-100 font-semibold">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="px-3 py-1.5 rounded-full border border-slate-200 bg-white mr-2">Edit</button>
                  <button className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("welcome");
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="text-slate-900">
      <Nav page={page} setPage={setPage} />
      <Shell>
        {page === "welcome" && <Welcome setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "dashboard" && (
          <Dashboard setPage={setPage} setSelectedCourse={setSelectedCourse} />
        )}
        {page === "courses" && (
          <Courses setPage={setPage} setSelectedCourse={setSelectedCourse} />
        )}
        {page === "course" && (
          <CourseDetails course={selectedCourse} setPage={setPage} />
        )}
        {page === "certificate" && <Certificate setPage={setPage} />}
        {page === "admin" && <Admin />}
      </Shell>
    </div>
  );
}