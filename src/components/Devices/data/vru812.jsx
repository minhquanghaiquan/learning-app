const vru812 = {
  intro: 'Điện VRS-812/S do Viettel sản xuất. Đây là điện đài sóng ngắn tích hợp các công nghệ hiện đại...',

  specs: [
    { label: "Dải tần công tác", value: "1,5 MHz ÷ 29,99999 MHz" },
    { label: "Công suất phát", value: "125W/500W" },
    // ...
  ],

  features: [
    {
      title: "Tính năng chiến thuật",
      content: `Máy thu phát VTĐ sóng ngắn nhảy tần VRS-631/S chủ yếu được sử dụng...`
    },
    {
      title: "Tính năng kỹ thuật chung",
      content: `- Dải tần công tác: 1,5 MHz ÷ 29,99999 MHz...`
    },
    // ...
  ],

  components: [
    'Máy thu phát VRS-631/S',
    'Bộ điều hưởng ăng ten',
    // ...
  ],

  accessories: [
    'Tai nghe',
    'Micro',
    // ...
  ],

  operation: [
    'Chế độ thoại (Voice)',
    'Chế độ dữ liệu (Data)',
    // ...
  ],

  diagrams: [
    "/vru_631/so_do_1.jpg",
    // Thêm đường dẫn các ảnh sơ đồ nếu có
  ],

  maintenance: [
    'Kiểm tra kết nối điện hàng ngày...',
    // ...
  ],

  troubleshooting: [
    { problem: "Không phát được tín hiệu", solution: "Kiểm tra nguồn điện, ăng ten..." }
    // ...
  ],

  questions: [
    { q: "Máy bị mất nguồn thì làm gì?", a: "Kiểm tra cầu chì, nguồn cấp, kết nối điện..." }
    // ...
  ],
  models3d: [
    {
      id: "main",
      name: "Toàn bộ thiết bị",
      url: "/vrs_631/3d_vrs631/vrs631s.glb",
      thumbnail: "/vrs_631/3d_vrs631/vrs631s-thumb.jpg",
      // Vị trí đúng khi ghép xong
      target: [1.5, 0.7, 0],
      // Vị trí xuất phát (random để kéo thả)
      init: [3, 0, 0],
    },
    {
      id: "antenna",
      name: "Ăng-ten",
      url: "/vrs_631/3d_vrs631/antenna.glb",
      thumbnail: "/vrs_631/3d_vrs631/antenna-thumb.jpg",
            // Vị trí đúng khi ghép xong
      target: [-2, 1, 0],
      // Vị trí xuất phát (random để kéo thả)
      init: [-6, 0, 0],
    },
    {
      id: "power",
      name: "Bộ nguồn",
      url: "/vrs_631/3d_vrs631/power.glb",
      thumbnail: "vrs_631/3d_vrs631/power-thumb.jpg",
      target: [-1, 0, 0],
      init: [-3, 0, 0],
    },
    // ...các bộ phận khác
  ],
};
export default vru812;
