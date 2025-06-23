import vrs631s from './vrs631s';

const devices = [
  {
    id: "vrs631s",
    title: "VRS 631/S",
    icon: "/vrs_631/vrs_631.png",
    images: [
      "/assets/vrs_631/vrs_631.png",
      "/assets/vrs_631/overview.png",
      "/assets/vrs_631/accessory.jpg"
    ],
    summary: "Đài sóng ngắn tích hợp công nghệ hiện đại.",
    delay: 0.2,      
    type: "VHF",
    details: vrs631s
  },
  {
    id: "vru812",
    title: "VRU-812",
    icon: "/vru_812/vrs_812.png",
    images: [
      "/assets/vru_812/vrs_812.png",
      "/assets/vru_812/overview.png",
      "/assets/vru_812/accessory.jpg"
    ],
    summary: "Đài VRU-812 hiện đại.",
    delay: 0.3,
    type: "VHF",
    details: {}, // Bạn thêm sau nếu có
  },
  // ... thêm các thiết bị khác cùng kiểu
];

export default devices;
