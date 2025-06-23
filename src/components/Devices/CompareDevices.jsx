import React from "react";

export default function CompareDevices({ devices }) {
  // Nếu chưa chọn đủ 2 thiết bị thì không hiển thị bảng
  if (!devices || devices.length < 2) return null;

  // Gom tất cả các thông số specs của mọi thiết bị (nếu có)
  const allSpecs = Array.from(
    new Set(
      devices.flatMap((d) => (d.details?.specs || []).map((s) => s.label))
    )
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg p-6 mt-6 shadow">
      <h2 className="text-xl font-bold mb-4">So sánh thông số thiết bị</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Thông số</th>
            {devices.map((d) => (
              <th
                className="border px-4 py-2 text-center font-semibold"
                key={d.id}
              >
                {d.title || d.name || d.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSpecs.length === 0 ? (
            <tr>
              <td
                className="border px-4 py-4 text-gray-500 text-center"
                colSpan={devices.length + 1}
              >
                Không có thông số nào để so sánh.
              </td>
            </tr>
          ) : (
            allSpecs.map((label, i) => (
              <tr key={label} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="border px-4 py-2 font-medium">{label}</td>
                {devices.map((d) => {
                  const spec = (d.details?.specs || []).find(
                    (s) => s.label === label
                  );
                  return (
                    <td
                      className="border px-4 py-2 text-center"
                      key={d.id + label}
                    >
                      {spec && spec.value ? spec.value : ""}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
