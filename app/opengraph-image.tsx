import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";
import { site } from "@/lib/seo";

export const alt = site.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "88px 80px 64px",
        background: "#222222",
        color: "#faf3e1",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            letterSpacing: -3,
            lineHeight: 1.2,
          }}
        >
          {profile.name}
          <span style={{ color: "#ff6d1f" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            color: "#b9b4a8",
          }}
        >
          {profile.role}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#a4a095" }}>
          shaktiranjan.dev
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 112,
            lineHeight: 1,
            color: "#4d4c4a",
            letterSpacing: -8,
          }}
        >
          [s]
        </div>
      </div>
    </div>,
    size,
  );
}
