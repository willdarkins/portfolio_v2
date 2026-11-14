import { MarginNote } from "./ink/MarginNote";

/*
  Stand-in for the pen-and-ink portrait (sketch from the canvas). The final
  portrait is traced from Will's photo later; until then the label says so.
*/
export function PortraitPlaceholder({
  label = "Placeholder portrait sketch. Final portrait coming",
  note = "drawn from life, mostly",
}: {
  label?: string;
  note?: string;
}) {
  return (
    <>
      <div className="w-full max-w-85">
        <svg
          role="img"
          aria-label={label}
          viewBox="0 0 380 460"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block h-auto w-full text-navy"
        >
          <ellipse cx="196" cy="205" rx="120" ry="140" stroke="none" className="fill-gold opacity-16" />
          <path d="M34 40 C 150 32 250 34 344 40 C 350 150 350 320 344 420 C 230 428 130 426 34 420 C 28 300 30 150 34 40" strokeWidth="2" opacity="0.55" />
          <path d="M118 132 C 108 78 168 48 200 52 C 252 58 282 92 276 140 C 270 120 258 104 238 96 C 250 108 256 122 256 134 C 244 116 226 104 206 102 C 214 112 218 122 216 130 C 202 112 176 106 156 118 C 168 116 178 120 182 128 C 162 120 138 124 126 142 C 128 136 130 132 118 132 Z" strokeWidth="2.4" />
          <path d="M128 140 C 118 182 120 224 142 258 C 156 280 176 296 200 296 C 226 296 248 278 262 254 C 280 222 282 180 272 140" strokeWidth="2.6" />
          <path d="M270 196 C 284 194 288 212 276 224" strokeWidth="2.2" />
          <path d="M150 186 C 162 179 180 179 190 186" strokeWidth="2.4" />
          <path d="M212 186 C 224 179 242 179 252 186" strokeWidth="2.4" />
          <path d="M154 200 C 164 194 180 194 188 202" strokeWidth="2.2" />
          <path d="M214 202 C 224 194 240 194 250 200" strokeWidth="2.2" />
          <circle cx="171" cy="201" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="231" cy="201" r="2.6" fill="currentColor" stroke="none" />
          <path d="M200 200 C 197 222 192 238 202 246 C 208 248 214 246 218 242" strokeWidth="2.2" />
          <path d="M176 264 C 192 273 214 273 228 263" strokeWidth="2.4" />
          <path d="M172 250 C 176 258 182 262 190 263" strokeWidth="1.6" opacity="0.6" />
          <path d="M180 296 C 178 314 176 326 172 338" strokeWidth="2.2" />
          <path d="M224 296 C 226 314 228 326 232 338" strokeWidth="2.2" />
          <path d="M96 430 C 104 372 140 342 200 342 C 260 342 296 372 304 430" strokeWidth="2.6" />
          <path d="M182 344 C 190 360 194 372 200 380 C 206 372 210 360 218 344" strokeWidth="2.2" />
          <path d="M164 360 C 150 372 142 392 140 410" strokeWidth="1.8" opacity="0.7" />
          <path d="M236 360 C 250 372 258 392 260 410" strokeWidth="1.8" opacity="0.7" />
          <g strokeWidth="1.5" opacity="0.4">
            <path d="M150 244 l 20 -12" />
            <path d="M156 256 l 22 -13" />
            <path d="M164 266 l 20 -12" />
            <path d="M246 244 l 18 -10" />
            <path d="M252 256 l 18 -10" />
          </g>
          <path d="M268 150 C 278 182 276 224 258 256" strokeWidth="3.5" opacity="0.7" className="stroke-gold" />
        </svg>
      </div>
      <MarginNote size="large" rotate="-rotate-2" arrow="short" className="mt-2.5">
        {note}
      </MarginNote>
    </>
  );
}
