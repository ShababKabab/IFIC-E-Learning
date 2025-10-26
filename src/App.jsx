// src/App.jsx
import React, { useMemo, useState } from "react";

const BRAND_RED = "#C8102E";
const ACCENT_BLUE = "#0078D7";

/* ────────────────────────────────────────────────────────────
   Seed Data: MORE courses than shown on Dashboard (3 only)
   ──────────────────────────────────────────────────────────── */
const initialCourses = [
  {
    id: 1,
    title: "AML & KYC Basics",
    trainer: "Compliance",
    duration: "2h",
    status: "Active",
    overview: "Learn regulatory expectations and IFIC KYC standards.",
    materials: [
      { name: "Policy PDF", url: "#" },
      { name: "KYC Checklist", url: "#" }
    ],
    lessons: [
      { id: "l1", title: "Intro to AML", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { id: "l2", title: "KYC Core Concepts", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { id: "l3", title: "Risk Scoring", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ],
    quiz: {
      passMark: 80,
      questions: [
        { q: "KYC stands for?", options: ["Know Your Customer", "Know Your Company", "Keep Your Cash"], correctIndex: 0 },
        { q: "AML is mainly about preventing?", options: ["Money Laundering", "Marketing Leads", "Monthly Leaves"], correctIndex: 0 },
        { q: "Customer risk is assessed using?", options: ["Random guess", "Defined criteria", "Only intuition"], correctIndex: 1 }
      ]
    }
  },
  {
    id: 2,
    title: "Cybersecurity Awareness",
    trainer: "IT Division",
    duration: "1.5h",
    status: "Active",
    overview: "Recognize phishing, safe browsing, device hygiene.",
    materials: [{ name: "Playbook", url: "#" }],
    lessons: [
      { id: "l1", title: "Phishing 101", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { id: "l2", title: "Passwords & MFA", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ],
    quiz: {
      passMark: 67,
      questions: [
        { q: "Strong passwords are…", options: ["Short & simple", "Long & unique", "Same everywhere"], correctIndex: 1 },
        { q: "MFA stands for…", options: ["Multi-Factor Authentication", "Mail for Admin", "Mobile Fast Access"], correctIndex: 0 }
      ]
    }
  },
  // Extra simple entries so Courses > Dashboard
  { id: 3, title: "Information Security Policy", trainer: "IT Division", duration: "1h", status: "Active", overview: "Policy overview.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
  { id: 4, title: "Fraud Risk Management", trainer: "Risk", duration: "2h", status: "Active", overview: "Fraud patterns and controls.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
  { id: 5, title: "Customer Service Excellence", trainer: "HR", duration: "1h", status: "Active", overview: "Service skills.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
  { id: 6, title: "Core Banking Ops 101", trainer: "Operations", duration: "2h", status: "Active", overview: "Core ops basics.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
  { id: 7, title: "Branch Compliance Essentials", trainer: "Compliance", duration: "1.5h", status: "Active", overview: "Branch checks.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
  { id: 8, title: "Data Privacy Fundamentals", trainer: "Legal", duration: "1h", status: "Active", overview: "Privacy intro.", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } },
];

function Nav({ page, setPage, authed, role, onLogout }) {
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
        <div className="flex flex-wrap gap-2 items-center">
          {!authed && <Item to="welcome">Welcome</Item>}
          {!authed && <Item to="login">Login</Item>}
          {authed && <Item to="dashboard">Dashboard</Item>}
          {authed && <Item to="courses">Courses</Item>}
          {authed && role === "ADMIN" && <Item to="admin">Admin</Item>}
          {authed && (
            <button onClick={onLogout} className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">
              Logout
            </button>
          )}
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

function Login({ setAuthed, setRole, setPage }) {
  const [email, setEmail] = useState("");
  const [roleLocal, setRoleLocal] = useState("EMPLOYEE");
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="bg-white border border-slate-200 rounded-2xl shadow p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: BRAND_RED }}>Login (Demo)</h2>
        <input className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-200" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <select className="w-full mb-4 px-3 py-2 rounded-xl border border-slate-200" value={roleLocal} onChange={e=>setRoleLocal(e.target.value)}>
          <option value="EMPLOYEE">Employee</option>
          <option value="TRAINER">Trainer</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          onClick={() => { setAuthed(true); setRole(roleLocal); setPage("dashboard"); }}
          className="w-full px-4 py-2.5 rounded-xl text-white font-semibold shadow"
          style={{ background: BRAND_RED }}
        >
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

function Dashboard({ setPage, setSelectedCourse, role, courses }) {
  const rec = courses.slice(0, 3); // only 3 → fewer than Courses tab
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Welcome to SmartLearn</h1>
      <p className="text-slate-600">Your learning hub</p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow p-4 my-4">
        <div className="flex items-center justify-between">
          <strong>Overall Progress</strong>
          <span className="text-slate-600">3/8 completed</span>
        </div>
        <ProgressBar value={38} />
      </div>

      {role === "TRAINER" && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4">
          <strong>Trainer tools</strong>
          <p className="text-slate-700 text-sm">Create draft courses and add lessons from the Course page.</p>
          <p className="text-slate-600 text-xs mt-1">(*Admin has full CRUD; Trainer can quickly add lessons in any course.)</p>
        </div>
      )}

      {role === "ADMIN" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <strong>Admin overview</strong>
          <p className="text-slate-700 text-sm">Manage users/courses, see compliance (see Admin tab).</p>
        </div>
      )}

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

function Courses({ setPage, setSelectedCourse, courses }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => courses.filter(c => (c.title + c.trainer).toLowerCase().includes(q.toLowerCase())), [q, courses]);

  return (
    <div>
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mt-2">Available Courses</h1>
          <p className="text-slate-600">Browse assigned and recommended modules</p>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="px-3 py-2 rounded-xl border border-slate-200" />
      </div>

      {/* More courses here than on Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-slate-600 text-sm">{c.trainer} • {c.duration}</p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-full px-3 py-1 font-semibold">{c.status}</div>
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

function LessonsSidebar({ course, currentLessonId, onPick }) {
  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl shadow p-3">
        <h3 className="font-semibold mb-2">Lessons</h3>
        <ul className="space-y-1">
          {(course.lessons?.length ? course.lessons : [{id:"x", title:"No lessons yet"}]).map(les => (
            <li key={les.id}>
              <button
                onClick={() => les.src && onPick(les.id)}
                className={`w-full text-left px-3 py-2 rounded-lg border ${currentLessonId === les.id ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"}`}
                disabled={!les.src}
                title={les.src ? "" : "Trainer/Admin can add lessons"}
              >
                {les.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CourseDetails({ course, setPage, setCertificateData, role, setCourses }) {
  const [tab, setTab] = useState("overview");
  const [currentLessonId, setCurrentLessonId] = useState(course?.lessons?.[0]?.id);
  const currentLesson = course?.lessons?.find(l => l.id === currentLessonId);

  const [answers, setAnswers] = useState({}); // {idx: optionIndex}
  const quiz = course?.quiz;

  // Trainer quick-add lesson (front-end only)
  const [newLesson, setNewLesson] = useState({ title: "", src: "" });

  if (!course) return <p className="text-slate-600">Select a course to continue.</p>;

  const submitQuiz = () => {
  try {
    // If no quiz, still show certificate page with defaults
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      setCertificateData({
        courseTitle: course?.title || "Course",
        percent: 0,
        passed: true,
        date: new Date().toLocaleDateString(),
      });
      // ensure state is applied before route swap
      setTimeout(() => setPage("certificate"), 0);
      return;
    }

    const total = quiz.questions.length;
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score++;
    });
    const percent = Math.round((score / total) * 100);
    const passed = percent >= (quiz.passMark ?? 60);

    setCertificateData({
      courseTitle: course?.title || "Course",
      percent,
      passed,
      date: new Date().toLocaleDateString(),
    });
    // navigate after state set
    setTimeout(() => setPage("certificate"), 0);
  } catch (e) {
    console.error("submitQuiz error:", e);
    // fallback navigation so you never get a blank screen
    setCertificateData({
      courseTitle: course?.title || "Course",
      percent: 0, passed: false,
      date: new Date().toLocaleDateString(),
    });
    setTimeout(() => setPage("certificate"), 0);
  }
};


  const addLesson = () => {
    if (!newLesson.title || !newLesson.src) return;
    setCourses(prev => prev.map(c => {
      if (c.id !== course.id) return c;
      const nextLessons = [...(c.lessons || []), { id: `l${(c.lessons?.length || 0) + 1}`, title: newLesson.title, src: newLesson.src }];
      return { ...c, lessons: nextLessons };
    }));
    setNewLesson({ title: "", src: "" });
    // Select the newly added lesson
    setCurrentLessonId(`l${(course.lessons?.length || 0) + 1}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Course: {course.title}</h1>
      <p className="text-slate-600">{course.trainer} • {course.duration}</p>

      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <LessonsSidebar course={course} currentLessonId={currentLessonId} onPick={setCurrentLessonId} />

        <div className="flex-1">
          <div className="bg-white border border-slate-200 rounded-2xl shadow p-3">
            <div className="aspect-video w-full bg-black/5 border border-slate-200 rounded-xl grid place-items-center mb-3">
              {currentLesson?.src ? (
                <video key={currentLesson.id} controls className="w-full h-full rounded-xl">
                  <source src={currentLesson.src} type="video/mp4" />
                </video>
              ) : (
                <span className="text-slate-500">📺 No lesson selected</span>
              )}
            </div>

            <div className="flex gap-2 mb-3 text-sm">
              {["overview","materials","quiz"].map(t => (
                <button key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-full border ${tab===t?"bg-slate-900 text-white border-slate-900":"bg-white border-slate-200"}`}>
                  {t[0].toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            {tab === "overview" && <div className="text-slate-700"><p>{course.overview || "—"}</p></div>}

            {tab === "materials" && (
              <div className="text-slate-700 space-y-2">
                {(course.materials || []).length
                  ? course.materials.map((m,i)=>(
                      <a key={i} href={m.url} className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:shadow">
                        ⬇ {m.name}
                      </a>
                    ))
                  : <span className="text-slate-500">No materials yet</span>}
              </div>
            )}

            {tab === "quiz" && (
              <div className="text-slate-800">
                {quiz?.questions?.length ? (
                  <>
                    <p className="mb-2 text-sm text-slate-600">Pass mark: {quiz.passMark}%</p>
                    {quiz.questions.map((q, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="font-medium">{idx+1}. {q.q}</div>
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, oi) => (
                            <label key={oi} className="flex items-center gap-2">
                              <input type="radio" name={`q${idx}`} checked={answers[idx]===oi} onChange={()=>setAnswers(a=>({...a,[idx]:oi}))}/>
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-slate-600">No quiz configured for this course.</p>
                )}
                <button onClick={submitQuiz} className="mt-2 px-4 py-2 rounded-lg text-white font-medium" style={{ background: BRAND_RED }}>
                  {quiz?.questions?.length ? "Submit Quiz" : "Mark Complete"}
                </button>
              </div>
            )}

            {/* TRAINER EXTRAS: quick add lesson (front-end only) */}
            {role === "TRAINER" && (
  <div className="mt-6 border-t pt-4">
    <div className="text-sm font-semibold mb-2">Trainer: Quick Add Lesson</div>

    {/* Title + URL */}
    <div className="flex flex-col sm:flex-row gap-2 mb-2">
      <input
        className="flex-1 px-3 py-2 rounded-xl border border-slate-200"
        placeholder="Lesson title"
        value={newLesson.title}
        onChange={(e)=>setNewLesson(s=>({...s,title:e.target.value}))}
      />
      <input
        className="flex-1 px-3 py-2 rounded-xl border border-slate-200"
        placeholder="Video URL (MP4/HLS) e.g., https://.../video.mp4"
        value={newLesson.src}
        onChange={(e)=>setNewLesson(s=>({...s,src:e.target.value}))}
      />
    </div>

    {/* OR pick a local file → we’ll generate a Blob URL */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const blobUrl = URL.createObjectURL(file); // temporary URL for playback
          // If title is empty, use the filename (without extension)
          const defaultTitle = file.name.replace(/\.[^/.]+$/, "");
          setNewLesson(s => ({
            ...s,
            title: s.title || defaultTitle,
            src: blobUrl, // we store the blob URL as the lesson source for demo playback
          }));
        }}
        className="text-sm"
        title="Pick a local video file for demo playback"
      />
      <span className="text-xs text-slate-500">
        Tip: For demo only. Blob URLs play immediately but won’t persist after page refresh.
      </span>
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => {
          if (!newLesson.title || !newLesson.src) return;
          // compute next lesson id based on current course length
          const nextId = `l${(course.lessons?.length || 0) + 1}`;

          setCourses(prev =>
            prev.map(c => {
              if (c.id !== course.id) return c;
              const nextLessons = [...(c.lessons || []), { id: nextId, title: newLesson.title, src: newLesson.src }];
              return { ...c, lessons: nextLessons };
            })
          );

          // select the newly added lesson and clear inputs
          setCurrentLessonId(nextId);
          setNewLesson({ title: "", src: "" });
        }}
        className="px-4 py-2 rounded-xl text-white font-semibold"
        style={{ background: ACCENT_BLUE }}
      >
        + Add Lesson
      </button>

      <button
        onClick={() => setNewLesson({ title: "", src: "" })}
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
      >
        Clear
      </button>
    </div>

    <p className="text-xs text-slate-500 mt-1">
      For production, lessons upload to Object Storage (S3/MinIO), transcoded to HLS and streamed via CDN using signed URLs.
    </p>
  </div>
)}


          </div>
        </div>
      </div>
    </div>
  );
}


function Certificate({ data, setPage }) {
  const safe = {
    courseTitle: data?.courseTitle || "[Course Title]",
    percent: typeof data?.percent === "number" ? data.percent : 0,
    passed: !!data?.passed,
    date: data?.date || new Date().toLocaleDateString(),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow p-6">
        <h1 className="text-center text-3xl font-semibold mb-2">Certificate of Completion</h1>
        <p className="text-center text-slate-700">
          This certifies that <strong>[Employee Name]</strong><br />
          has completed <strong>{safe.courseTitle}</strong> with a score of <strong>{safe.percent}%</strong>.
        </p>
        <p className={`text-center mt-2 ${safe.passed ? "text-green-700" : "text-red-700"}`}>
          {safe.passed ? "Status: PASSED" : "Status: NOT PASSED"}
        </p>
        <div className="flex items-center justify-between mt-10 text-slate-700">
          <div>Signature: ____________</div>
          <div>Date: {safe.date}</div>
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

/* ────────────────────────────────────────────────────────────
   Admin: working Add / Edit / Delete (front-end only)
   ──────────────────────────────────────────────────────────── */
function Admin({ courses, setCourses }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(null); // course id or null
  const [form, setForm] = useState({ title: "", trainer: "", duration: "1h", status: "Active" });

  const reset = () => setForm({ title: "", trainer: "", duration: "1h", status: "Active" });

  const addCourse = () => {
    if (!form.title || !form.trainer) return;
    const nextId = Math.max(0, ...courses.map(c=>c.id)) + 1;
    setCourses([
      ...courses,
      { id: nextId, title: form.title, trainer: form.trainer, duration: form.duration, status: form.status, overview: "", materials: [], lessons: [], quiz: { passMark: 60, questions: [] } }
    ]);
    reset(); setOpenAdd(false);
  };

  const editCourse = () => {
    if (!openEdit) return;
    setCourses(prev => prev.map(c => c.id === openEdit ? { ...c, ...form } : c));
    setOpenEdit(null); reset();
  };

  const startEdit = (c) => {
    setForm({ title: c.title, trainer: c.trainer, duration: c.duration, status: c.status });
    setOpenEdit(c.id);
  };

  const delCourse = (id) => {
    if (!confirm("Delete this course?")) return;
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-2">Admin Panel</h1>

      <div className="bg-white border border-slate-200 rounded-2xl shadow p-4 my-4 flex items-center justify-between">
        <strong>Course Management</strong>
        <button onClick={()=>setOpenAdd(true)} className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: BRAND_RED }}>
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
            {courses.map((r) => (
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
                  <button onClick={()=>startEdit(r)} className="px-3 py-1.5 rounded-full border border-slate-200 bg-white mr-2">Edit</button>
                  <button onClick={()=>delCourse(r.id)} className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {openAdd && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
          <div className="bg-white rounded-2xl shadow p-5 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-3">Add Course</h3>
            <div className="grid gap-2">
              <input className="px-3 py-2 rounded-xl border border-slate-200" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
              <input className="px-3 py-2 rounded-xl border border-slate-200" placeholder="Trainer" value={form.trainer} onChange={e=>setForm({...form, trainer:e.target.value})} />
              <div className="flex gap-2">
                <input className="flex-1 px-3 py-2 rounded-xl border border-slate-200" placeholder="Duration (e.g., 1h)" value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} />
                <select className="px-3 py-2 rounded-xl border border-slate-200" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>{setOpenAdd(false);}} className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">Cancel</button>
              <button onClick={addCourse} className="px-4 py-2 rounded-full text-white" style={{ background: BRAND_RED }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
          <div className="bg-white rounded-2xl shadow p-5 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-3">Edit Course (ID {openEdit})</h3>
            <div className="grid gap-2">
              <input className="px-3 py-2 rounded-xl border border-slate-200" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
              <input className="px-3 py-2 rounded-xl border border-slate-200" placeholder="Trainer" value={form.trainer} onChange={e=>setForm({...form, trainer:e.target.value})} />
              <div className="flex gap-2">
                <input className="flex-1 px-3 py-2 rounded-xl border border-slate-200" placeholder="Duration" value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} />
                <select className="px-3 py-2 rounded-xl border border-slate-200" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>{setOpenEdit(null); reset();}} className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">Cancel</button>
              <button onClick={editCourse} className="px-4 py-2 rounded-full text-white" style={{ background: BRAND_RED }}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   App: state + routing + guards
   ──────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("welcome");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [courses, setCourses] = useState(initialCourses);

  const restricted = ["dashboard", "courses", "course", "admin"];
  const pageGuarded = !authed && restricted.includes(page) ? "login" : page;
  const adminOnly = page === "admin" && role !== "ADMIN";
  const currentCourse = selectedCourse ? courses.find(c => c.id === selectedCourse.id) : null;

  const logout = () => { setAuthed(false); setRole(null); setPage("welcome"); };

  return (
    <div className="text-slate-900">
      <Nav page={pageGuarded} setPage={setPage} authed={authed} role={role} onLogout={logout} />
      <Shell>
        {pageGuarded === "welcome" && <Welcome setPage={setPage} />}
        {pageGuarded === "login" && (
          <Login setAuthed={setAuthed} setRole={setRole} setPage={setPage} />
        )}

        {pageGuarded === "dashboard" && (
          <Dashboard setPage={setPage} setSelectedCourse={setSelectedCourse} role={role} courses={courses} />
        )}

        {pageGuarded === "courses" && (
          <Courses setPage={setPage} setSelectedCourse={setSelectedCourse} courses={courses} />
        )}

        {pageGuarded === "course" && (
          <CourseDetails
            course={currentCourse}
            setPage={setPage}
            setCertificateData={setCertificateData}
            role={role}
            setCourses={setCourses}
          />
        )}

        {pageGuarded === "certificate" && (
          <Certificate data={certificateData} setPage={setPage} />
        )}

        {pageGuarded === "admin" && !adminOnly && (
          <Admin courses={courses} setCourses={setCourses} />
        )}
        {pageGuarded === "admin" && adminOnly && (
          <div className="text-red-600 font-medium">Admin access required.</div>
        )}
      </Shell>
    </div>
  );
}