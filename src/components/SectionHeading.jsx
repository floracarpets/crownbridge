import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  className = "",
}) {
  return (
    <div className={className}>
      <p
        className={`mb-[18px] text-[0.68rem] font-semibold leading-[1.8] tracking-[0.21em] ${light ? "text-[#ceaa72]" : "text-gold"}`}
      >
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {text && (
        <p className="mb-[30px] max-w-[420px] text-[0.87rem] text-[#b2b6ac]">
          {text}
        </p>
      )}
    </div>
  );
}
