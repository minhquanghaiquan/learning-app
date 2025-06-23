import React, { useState, useEffect, useRef } from "react";
import quizData from "./quizData";
import { jsPDF } from "jspdf";
import "../../fonts/Roboto_Condensed-ExtraLight-normal.js";


// Random shuffle
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Format time (hh:mm:ss DD-MM-YYYY)
function formatTimestamp(ts) {
  const d = new Date(ts);
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    pad(d.getHours()) +
    "-" +
    pad(d.getMinutes()) +
    "-" +
    pad(d.getSeconds()) +
    "_" +
    pad(d.getDate()) +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    d.getFullYear()
  );
}

export default function QuizPage() {
  // Thông tin cá nhân
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [inputError, setInputError] = useState("");

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // ====== TIMER ======
  const [timeLeft, setTimeLeft] = useState(0);
  const timer = useRef(null);

  // Khi bắt đầu quiz, khởi tạo timer
  useEffect(() => {
    if (quizList.length > 0 && !showResult) {
      setTimeLeft(quizList.length * 20);
      timer.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timer.current);
            setEndTime(Date.now());
            setShowResult(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer.current);
    }
    // Dừng timer khi reset hoặc xong quiz
    return () => clearInterval(timer.current);
  }, [quizList.length, showResult]);

  // Chọn/bỏ chọn thiết bị
  const handleSelectDevice = (deviceId) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  // Bắt đầu quiz
  const startQuiz = () => {
    if (!name.trim() || !className.trim()) {
      setInputError("Vui lòng nhập đầy đủ họ tên và lớp.");
      return;
    }
    if (selectedDevices.length === 0) {
      setInputError("Bạn phải chọn ít nhất 1 thiết bị!");
      return;
    }
    setInputError("");
    const selectedQuestions = quizData
      .filter((d) => selectedDevices.includes(d.deviceId))
      .flatMap((d) =>
        d.questions.map((q) => ({
          ...q,
          deviceName: d.deviceName,
        }))
      );
    const randomQuestions = shuffle(selectedQuestions);
    setQuizList(randomQuestions);
    setUserAnswers([]);
    setStep(0);
    setShowResult(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  // Trả lời câu hỏi
  const handleAnswer = (idx) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[step] = idx;
      return copy;
    });
    if (step < quizList.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
      setEndTime(Date.now());
      clearInterval(timer.current);
    }
  };

  // Làm lại
  const handleRestart = () => {
    setQuizList([]);
    setUserAnswers([]);
    setStep(0);
    setShowResult(false);
    setStartTime(null);
    setEndTime(null);
    setTimeLeft(0);
    clearInterval(timer.current);
  };

  // Tính điểm 10
  const numRight = userAnswers.filter(
    (ans, idx) => ans === quizList[idx]?.answer
  ).length;
  const totalQ = quizList.length;
  const score10 = totalQ > 0 ? Math.round((numRight / totalQ) * 100) / 10 : 0;

  // Thời gian làm bài
  const duration =
    startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0;
  const minutes = duration ? Math.floor(duration / 60) : 0;
  const seconds = duration ? duration % 60 : 0;
  const deviceNames = Array.from(
    new Set(quizList.map((q) => q.deviceName))
  ).join(", ");

  // ====== PDF EXPORT ======
  const handleDownloadPDF = () => {
    // Lấy thời điểm kết thúc (hoặc hiện tại nếu chưa kết thúc)
    const end = endTime || Date.now();
    const date = new Date(end);
    const pad = (n) => (n < 10 ? "0" + n : n);
    const endTimeStr =
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}  `
      + `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

    // Khởi tạo PDF
    const doc = new jsPDF();
    doc.setFont("Roboto_Condensed-ExtraLight", "normal");
    // Tiêu đề lớn căn giữa
    doc.setFontSize(20);
    doc.text("KẾT QUẢ TRẮC NGHIỆM", 105, 20, { align: "center" });

    doc.setFontSize(13);
    let y = 34;
    doc.text(`Họ tên: ${name}`, 20, y);
    doc.text(`Lớp: ${className}`, 130, y);

    y += 10;
    doc.text(`Các loại máy trong bộ câu hỏi: ${deviceNames}`, 20, y);

    y += 10;
    doc.text(`Thời gian làm bài: ${minutes} phút ${seconds} giây`, 20, y);

    y += 10;
    doc.text(`Thời điểm kết thúc làm bài: ${endTimeStr}`, 20, y);

    y += 10;
    doc.text(`Kết quả: Đúng ${numRight} / ${totalQ} câu hỏi`, 20, y);

    y += 10;
    doc.setFontSize(15);
    doc.setTextColor(38, 86, 213); // xanh đậm
    doc.text(`Điểm số: ${score10}/10`, 20, y);
    doc.setTextColor(0, 0, 0);

    doc.save(
      `KetQuaQuiz_${name.replace(/\s/g, "_")}_${className}_${Date.now()}.pdf`
    );
  };

  // Trang nhập thông tin và chọn thiết bị
  if (quizList.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Thông tin làm trắc nghiệm</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Họ và tên:
            <input
              className="border rounded px-3 py-1 ml-2 w-2/3"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label className="block mb-1 font-semibold">
            Lớp:
            <input
              className="border rounded px-3 py-1 ml-2 w-1/3"
              value={className}
              onChange={e => setClassName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-6 flex flex-wrap gap-4">
          {quizData.map((d) => (
            <label key={d.deviceId} className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:shadow">
              <input
                type="checkbox"
                checked={selectedDevices.includes(d.deviceId)}
                onChange={() => handleSelectDevice(d.deviceId)}
              />
              <span className="font-semibold">{d.deviceName}</span>
            </label>
          ))}
        </div>
        <div className="mb-2 text-sm text-gray-600">
          * Mỗi câu 20 giây. Hết giờ tự động nộp bài!
        </div>
        {inputError && (
          <div className="text-red-600 mb-3">{inputError}</div>
        )}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          disabled={selectedDevices.length === 0}
          onClick={startQuiz}
        >
          Bắt đầu làm trắc nghiệm
        </button>
      </div>
    );
  }

  // Trang làm quiz
  if (!showResult) {
    const q = quizList[step];
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-xl shadow">
        <div className="mb-4 flex justify-between items-center">
          <div className="font-semibold">Họ tên: {name}</div>
          <div className="font-semibold">Lớp: {className}</div>
        </div>
        <div className="mb-2 text-right text-sm">
          Thời gian còn lại:{" "}
          <span className="font-bold text-red-600">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Câu {step + 1}/{quizList.length}
        </h3>
        <div className="mb-2 text-gray-500 text-sm">
          <b>Thuộc thiết bị:</b> {q.deviceName}
        </div>
        <div className="mb-4 font-medium">{q.question}</div>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`border px-4 py-2 rounded hover:bg-blue-100 transition ${typeof userAnswers[step] !== "undefined"
                ? idx === q.answer
                  ? "border-green-500 bg-green-50"
                  : idx === userAnswers[step]
                    ? "border-red-500 bg-red-50"
                    : ""
                : ""
                }`}
              onClick={() => handleAnswer(idx)}
              disabled={typeof userAnswers[step] !== "undefined"}
            >
              {opt}
            </button>
          ))}
        </div>
        {typeof userAnswers[step] !== "undefined" && (
          <div className="mt-3 font-semibold text-center">
            {userAnswers[step] === q.answer
              ? <span className="text-green-700">✅ Đúng!</span>
              : <span className="text-red-700">❌ Sai!</span>}
          </div>
        )}
      </div>
    );
  }

  // Trang kết quả
  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-xl shadow text-center">
      <h3 className="text-2xl font-bold mb-4">Kết quả trắc nghiệm</h3>
      <div className="mb-2">
        <b>Họ tên:</b> {name} &nbsp;|&nbsp; <b>Lớp:</b> {className}
      </div>
      <div className="mb-2">
        <b>Các loại máy trong bộ câu hỏi:</b> {deviceNames}
      </div>
      <div className="mb-2">
        <b>Thời gian làm bài:</b> {minutes} phút {seconds} giây
      </div>
      <div className="mb-2">
        <b>Thời điểm kết thúc làm bài:</b> {(() => {
          if (!endTime) return "";
          const date = new Date(endTime);
          const pad = (n) => (n < 10 ? "0" + n : n);
          return (
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} `
            + `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
          );
        })()}
      </div>
      <div className="mb-2">
        <b>Kết quả:</b> Đúng <b>{numRight}</b> / {totalQ} câu hỏi
      </div>
      <div className="mb-3">
        <b>Điểm số:</b>{" "}
        <span className="text-xl font-bold text-blue-700">{score10} / 10</span>
      </div>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3"
        onClick={handleDownloadPDF}
      >
        Tải xuống PDF
      </button>
      <button
        className="mt-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
        onClick={handleRestart}
      >
        Làm lại
      </button>
    </div>
  );
}
