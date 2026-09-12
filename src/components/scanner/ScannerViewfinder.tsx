'use client'

export function ScannerViewfinder() {
  return (
    <div className="relative mx-auto mt-6 flex h-[55vh] w-[80%] max-w-[280px] items-center justify-center">
      <div className="relative h-full w-full">
        {/* 4 Corner Brackets */}
        <div className="absolute top-0 left-0 size-7 border-t-[3.5px] border-l-[3.5px] border-white" />
        <div className="absolute top-0 right-0 size-7 border-t-[3.5px] border-r-[3.5px] border-white" />
        <div className="absolute bottom-4 left-0 size-7 border-b-[3.5px] border-l-[3.5px] border-white" />
        <div className="absolute bottom-4 right-0 size-7 border-b-[3.5px] border-r-[3.5px] border-white" />

        {/* QR Target Box */}
        <div className="absolute top-[10%] right-[6%] flex h-16 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-400/80 bg-emerald-950/20 backdrop-blur-2xs">
          <span className="text-[9px] font-medium text-white/90">QR Target</span>
        </div>

        {/* Instruction Banner Pill */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/75 px-3.5 py-1.5 text-[11px] font-normal text-white backdrop-blur-md shadow-md">
          Keep page flat and inside the brackets
        </div>
      </div>
    </div>
  )
}