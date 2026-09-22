export default function CylinderStack() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(90,90,90,0.35),transparent_55%)]" />
      <div className="relative flex flex-col items-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative"
            style={{
              width: `${92 - i * 6}px`,
              height: `${28 - i * 1.5}px`,
              marginTop: i === 0 ? 0 : -6,
              zIndex: 10 - i,
            }}
          >
            <div className="absolute inset-x-2 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600" />
            <div className="absolute inset-x-0 top-[18%] h-[70%] rounded-full bg-gradient-to-b from-zinc-300 via-zinc-700 to-zinc-900 shadow-[0_8px_16px_rgba(0,0,0,0.45)]" />
            <div className="absolute inset-x-3 top-[22%] h-[18%] rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}
