// import React from "react";
// import Introduction from "./components/Introduction/Introduction";
// import VHFDevices from "./components/Devices/VHFDevices";
// import HFDevices from "./components/Devices/HFDevices";
// import Objectives from "./components/Banner/Objectives";
// import ContactInfo from "./components/ContactInfo/ContactInfo";
// import FeedbackSection from "./components/Banner/FeedbackSection";
// import Footer from "./components/Footer/Footer";

// const App = () => {
//   return (
//     <main className="overflow-x-hidden bg-white text-dark">
//       <Introduction />
//       <VHFDevices />
//       <HFDevices />
//       <Objectives />
//       <ContactInfo />
//       <FeedbackSection />
//       <Footer />
//     </main>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Introduction from "./components/Introduction/Introduction";
import VHFDevices from "./components/Devices/VHFDevices";
import HFDevices from "./components/Devices/HFDevices";
import Objectives from "./components/Banner/Objectives";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import FeedbackSection from "./components/Banner/FeedbackSection";
import Footer from "./components/Footer/Footer";
import DeviceList from "./components/Devices/DeviceList";
import DeviceDetail from "./components/Devices/DeviceDetail";
import QuizPage from "./components/Quiz/QuizPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="overflow-x-hidden bg-white text-dark">
              <Introduction />
              <VHFDevices />
              <HFDevices />
              <Objectives />
              <ContactInfo />
              <FeedbackSection />
              <Footer />
            </main>
          }
        />
        <Route path="/devices" element={<DeviceList />} />
        <Route path="/devices/:id" element={<DeviceDetail />} />
        <Route path="/quiz" element={<QuizPage />} />
        {/* Thêm các route khác nếu muốn */}
      </Routes>
    </Router>
  );
};

export default App;
