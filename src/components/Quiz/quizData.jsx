const quizData = [
  {
    deviceId: "vrs631s",  // trùng với id trong devices.js
    deviceName: "VRS-631/S", // tuỳ, dùng cho UI filter
    questions: [
      {
        id: "vrs631s_q1",
        question: "Dải tần công tác của VRS-631/S là bao nhiêu?",
        options: [
          "1,5 MHz ÷ 29,99999 MHz",
          "2 MHz ÷ 32 MHz",
          "125W/500W",
          "HF/VHF/UHF"
        ],
        answer: 0 // chỉ số đáp án đúng trong mảng options
      },
      {
        id: "vrs631s_q2",
        question: "Công suất phát của VRS-631/S là bao nhiêu?",
        options: [
          "1,5 MHz ÷ 29,99999 MHz",
          "500W",
          "125W/500W",
          "1000W"
        ],
        answer: 2
      }
      // ...thêm câu hỏi nữa
    ]
  },
  {
    deviceId: "vru812",
    deviceName: "VRU-812",
    questions: [
      {
        id: "vru812_q1",
        question: "Chế độ hoạt động của VRU-812 KHÔNG bao gồm?",
        options: [
          "Voice",
          "Data",
          "Test",
          "Scan"
        ],
        answer: 2
      }
      // ...
    ]
  }
  // ...thêm thiết bị khác
];

export default quizData;
