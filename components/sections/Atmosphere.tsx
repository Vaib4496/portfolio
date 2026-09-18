export function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-bg">
      {/* 64px Radial Grid Pattern with Alpha Fade */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_50%,transparent_100%)]"
      />

      {/* Primary Top Violet Ambient Glow */}
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] sm:h-[550px] bg-accent/20 rounded-full blur-[140px] opacity-75" />

      {/* Secondary Ambient Accent Glow for Visual Depth */}
      <div className="absolute top-[35%] right-[-10%] w-[450px] h-[450px] bg-accent/10 rounded-full blur-[160px] opacity-40" />
      <div className="absolute top-[70%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] opacity-30" />
    </div>
  );
}
