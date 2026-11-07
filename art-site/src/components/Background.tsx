// Відео з хмарами на весь екран, позаду всього сайту.
// autoPlay + muted + playsInline — без цих трьох браузери (особливо на iPhone)
// не запускають відео самі. poster — картинка, поки відео вантажиться.
function Background() {
  return (
    <div className="background" aria-hidden="true">
      <video
        className="background-video"
        src="/video/clouds.mp4"
        poster="/video/clouds-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="background-shade" />
    </div>
  );
}

export default Background;
