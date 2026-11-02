
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";

import "./App.css";

/* =========================================
   BIRTHDAY MEMORY PHOTOS
========================================= */

const memories = [
  {
    src: "/images/memory1.jpg",
    title: "A Beautiful Moment",
    caption: "One of those memories I want to keep forever.",
  },
  {
    src: "/images/memory2.jpg",
    title: "Your Lovely Smile",
    caption: "Your smile makes even ordinary days special.",
  },
  {
    src: "/images/memory3.jpg",
    title: "Us Together",
    caption: "My favourite moments are the ones we share.",
  },
  {
    src: "/images/memory4.jpg",
    title: "Our Little World",
    caption: "Some memories are too precious for words.",
  },
  {
    src: "/images/memory5.jpg",
    title: "A Moment to Remember",
    caption: "A little memory that means so much to me.",
  },
  {
    src: "/images/memory6.jpg",
    title: "My Favourite Person",
    caption: "Life feels a little brighter with you in it.",
  },
  {
    src: "/images/memory7.jpg",
    title: "Always You",
    caption: "Here is to many more memories together.",
  },
];

const scenes = [
  { name: "Welcome", number: "01" },
  { name: "A Little Note", number: "02" },
  { name: "Almost There", number: "03" },
  { name: "Birthday Memories", number: "04" },
  { name: "One Last Thing", number: "05" },
];

/* =========================================
   FLOATING BACKGROUND PHOTOS
========================================= */

function FloatingPhotoBackground() {
  return (
    <div className="floating-photo-background" aria-hidden="true">
      {memories.map((memory, index) => (
        <div
          className={`floating-photo floating-photo-${index + 1}`}
          key={memory.src}
        >
          <img src={memory.src} alt="" />
          <div className="floating-photo-overlay" />
        </div>
      ))}
    </div>
  );
}

/* =========================================
   SCENE 1: WELCOME
========================================= */

function WelcomeScene({ onNext }) {
  return (
    <section className="surprise-scene welcome-scene">
      <div className="welcome-orbit">
        <Heart fill="currentColor" strokeWidth={1.4} />
      </div>

      <p className="scene-eyebrow">
        <Sparkles size={15} />
        A little something for you
      </p>

      <h1 className="scene-title">
        Hey, <em>Pappu.</em>
      </h1>

      <p className="scene-description">
        I made something special.
        <br />
        And every little part of it is for you.
      </p>

      <div className="button-row">
        <button className="primary-button" onClick={onNext} type="button">
          Open your surprise <ArrowRight size={17} />
        </button>
      </div>

      <p className="scene-small-text">
        Made with love, just for you.
      </p>
    </section>
  );
}

/* =========================================
   SCENE 2: A LITTLE NOTE
========================================= */

function IntroScene({ onNext, onBack }) {
  return (
    <section className="surprise-scene intro-scene">
      <p className="scene-eyebrow">A little note from my heart</p>

      <h1 className="scene-title">
        You make life
        <br />
        <em>more beautiful.</em>
      </h1>

      <p className="scene-description">
        If I could give you one thing, it would be the ability to see yourself
        through my eyes. Maybe then you would understand how special you are
        to me.
      </p>

      <blockquote className="intro-quote">
        "You are one of my favourite parts of this beautiful life."
      </blockquote>

      <div className="button-row">
        <button className="secondary-button" onClick={onBack} type="button">
          <ArrowLeft size={17} /> Go back
        </button>

        <button className="primary-button" onClick={onNext} type="button">
          There's more <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

/* =========================================
   SCENE 3: MAKE A WISH
========================================= */

function AnticipationScene({ onNext, onBack, onStartMusic }) {
  const [startingMusic, setStartingMusic] = useState(false);

  async function handleMakeAWish() {
    if (startingMusic) return;

    setStartingMusic(true);

    try {
      // Start the music directly from the user's button click.
      await onStartMusic();
    } finally {
      // Open the birthday scene even if the browser blocks audio.
      onNext();
      setStartingMusic(false);
    }
  }

  return (
    <section className="surprise-scene anticipation-scene">
      <div className="countdown-heart">
        <Heart fill="currentColor" />
      </div>

      <p className="scene-eyebrow">Just a little more magic</p>

      <h1 className="scene-title">
        Ready for your
        <br />
        <em>little surprise?</em>
      </h1>

      <p className="scene-description">
        Turn the moment into a memory.
        <br />
        Your birthday wishes are waiting.
      </p>

      <div className="button-row">
        <button
          className="primary-button"
          onClick={handleMakeAWish}
          type="button"
          disabled={startingMusic}
        >
          {startingMusic ? (
            "Opening your surprise..."
          ) : (
            <>
              Make a wish <Sparkles size={17} />
            </>
          )}
        </button>
      </div>

      <p className="scene-small-text">
        Turn your sound on for a little magic ♪
      </p>

      <div className="button-row compact-button-row">
        <button className="secondary-button" onClick={onBack} type="button">
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    </section>
  );
}

/* =========================================
   SCENE 4: BIRTHDAY WISHES AND GALLERY
========================================= */

function BirthdayScene({
  onBack,
  onNext,
  musicPlaying,
  onToggleMusic,
  onOpenMemory,
}) {
  return (
    <section className="surprise-scene birthday-scene">
      <p className="scene-eyebrow">Today is all about you</p>

      <h1 className="birthday-heading">
        Happy Birthday,
        <br />
        <em>my Pappu</em> <span className="birthday-emoji">✦</span>
      </h1>

      <p className="birthday-description">
        To the person who makes my world brighter — may this new chapter bring
        you all the happiness your heart can hold.
      </p>

      <div className="music-player">
        <div className="music-player-left">
          <div className="music-icon">
            <Music2 size={21} />
          </div>

          <div className="music-details">
            <h3>A Little Song for You</h3>
            <p>
              {musicPlaying
                ? "Playing your special song..."
                : "Tap play if the music hasn't started"}
            </p>
          </div>
        </div>

        <button
          className="music-toggle"
          onClick={onToggleMusic}
          type="button"
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? <Pause size={17} /> : <Play size={17} />}
          {musicPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <h2 className="media-heading">Little Pieces of Us</h2>

      <p className="gallery-subtitle">
        Every picture holds a memory. Tap one to see it up close.
      </p>

      <div className="photo-gallery">
        {memories.map((memory, index) => (
          <button
            className="photo-card"
            key={memory.src}
            onClick={() => onOpenMemory(index)}
            type="button"
            aria-label={`Open memory: ${memory.title}`}
          >
            <div className="photo-card-image">
              <img src={memory.src} alt={memory.title} loading="lazy" />
              <div className="photo-card-shine" />
            </div>

            <div className="photo-card-caption">
              <h3>{memory.title}</h3>
              <p>Memory {String(index + 1).padStart(2, "0")}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="memory-note">
        If I could relive a thousand moments, I would still choose the ones
        with you.
      </p>

      <p className="birthday-closing">
        Happy birthday, Pappu. I hope this little surprise makes you smile
        today and reminds you how much you mean to me.
      </p>

      <div className="button-row">
        <button className="secondary-button" onClick={onBack} type="button">
          <ArrowLeft size={16} /> Go back
        </button>

        <button className="primary-button" onClick={onNext} type="button">
          One last thing <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

/* =========================================
   SCENE 5: FINAL PROMISE
========================================= */

function FinalScene({ onBack, onRestart }) {
  return (
    <section className="surprise-scene final-scene">
      <p className="scene-eyebrow">One last thing...</p>

      <h1 className="scene-title">
        A little promise,
        <br />
        <em>just for you.</em>
      </h1>

      
<div className="wish-card">
  <p>
    Hai Papa! ❤️ Wish you many more happy returns of the day!
    Ini vara ellam naalum unnoda days romba happy-ah,
    peaceful-ah, and beautiful-ah irukkanum.
  </p>

  <p>
    Sorry Papa, ennala innaiku un kooda irukka mudiyala.
    Naan romba struggles go through pannitu irukken,
    especially because of my company issues. Athanala
    ennala vara mudiyala. I am really, really sorry.
  </p>

  <p>
    Intha ellam issues mudinjathum, unna paakka naane
    varuven. I promise you! ❤️
  </p>

  <p>
    Unakku gifts kudukka mudiyalanu enakku romba kashtama
    irukku. Aana love is not just about gifts, Papa.
    Efforts, care, and the love behind every little thing
    dhaan mukkiyam. I hope you understand me.
  </p>

  <p>
    I wish I could be there with you today, celebrate
    your birthday, see your smile, and make this day
    more special for you.
  </p>

  <div className="promise-line">
    You will always be special to me, Papa. ❤️
  </div>

  <p className="final-signature">
    Once again, Happy Birthday, Papa!
    With all my love, always. ♡
  </p>
</div>


      <div className="button-row">
        <button className="secondary-button" onClick={onBack} type="button">
          <ArrowLeft size={16} /> Go back
        </button>

        <button className="primary-button" onClick={onRestart} type="button">
          <Heart size={16} fill="currentColor" /> Start again
        </button>
      </div>
    </section>
  );
}

/* =========================================
   PHOTO LIGHTBOX
========================================= */

function MemoryLightbox({ index, onClose, onPrevious, onNext }) {
  const memory = memories[index];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePrevious = useCallback(() => {
    onPrevious();
  }, [onPrevious]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, handlePrevious, handleNext]);

  if (!memory) return null;

  return (
    <div
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Memory photo viewer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="lightbox-content">
        <button
          className="lightbox-close"
          onClick={handleClose}
          type="button"
          aria-label="Close photo"
        >
          <X size={22} />
        </button>

        <button
          className="lightbox-nav lightbox-prev"
          onClick={handlePrevious}
          type="button"
          aria-label="Previous photo"
        >
          <ArrowLeft size={21} />
        </button>

        <img src={memory.src} alt={memory.title} />

        <button
          className="lightbox-nav lightbox-next"
          onClick={handleNext}
          type="button"
          aria-label="Next photo"
        >
          <ArrowRight size={21} />
        </button>

        <div className="lightbox-caption">
          <h3>{memory.title}</h3>
          <p>{memory.caption}</p>

          <div className="lightbox-count">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(memories.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   MAIN APP
========================================= */

export default function App() {
  const [scene, setScene] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  // Create the audio element once and reuse it across all scenes.
  useEffect(() => {
    const audio = new Audio("/music/rathinamo.mp3");

    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = "auto";

    audioRef.current = audio;

    function handleAudioPlay() {
      setMusicPlaying(true);
    }

    function handleAudioPause() {
      setMusicPlaying(false);
    }

    audio.addEventListener("play", handleAudioPlay);
    audio.addEventListener("pause", handleAudioPause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handleAudioPlay);
      audio.removeEventListener("pause", handleAudioPause);
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Called directly from the Make a wish click.
  async function startMusic() {
    const audio = audioRef.current;

    if (!audio) return false;

    try {
      audio.volume = 0.65;

      if (audio.paused) {
        await audio.play();
      }

      setMusicPlaying(true);
      return true;
    } catch (error) {
      console.error("Birthday music could not start:", error);
      setMusicPlaying(false);
      return false;
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await startMusic();
      } else {
        audio.pause();
        setMusicPlaying(false);
      }
    } catch (error) {
      console.error("Unable to toggle birthday music:", error);
    }
  }

  function goNext() {
    setScene((current) => Math.min(current + 1, scenes.length - 1));
  }

  function goBack() {
    setScene((current) => Math.max(current - 1, 0));
  }

  function restartSurprise() {
    setScene(0);
    setLightboxIndex(null);

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setMusicPlaying(false);
  }

  const previousMemory = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + memories.length) % memories.length
    );
  }, []);

  const nextMemory = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % memories.length
    );
  }, []);

  const sceneProps = {
    onNext: goNext,
    onBack: goBack,
  };

  return (
    <main className="love-app">
      <FloatingPhotoBackground />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-mark">
          <Heart className="brand-heart" size={20} fill="currentColor" />
          <span>For Pappu</span>
        </div>

        <div className="scene-counter" aria-live="polite">
          <strong>{scenes[scene].number}</strong>
          <span>/</span>
          <span>05</span>
        </div>
      </header>

      <div className="scene-shell" key={scene}>
        {scene === 0 && <WelcomeScene {...sceneProps} />}

        {scene === 1 && <IntroScene {...sceneProps} />}

        {scene === 2 && (
          <AnticipationScene
            {...sceneProps}
            onStartMusic={startMusic}
          />
        )}

        {scene === 3 && (
          <BirthdayScene
            {...sceneProps}
            musicPlaying={musicPlaying}
            onToggleMusic={toggleMusic}
            onOpenMemory={setLightboxIndex}
          />
        )}

        {scene === 4 && (
          <FinalScene
            onBack={goBack}
            onRestart={restartSurprise}
          />
        )}
      </div>

      <footer className="love-footer">
        Made with <Heart size={12} fill="currentColor" /> for Pappu
      </footer>

      {lightboxIndex !== null && (
        <MemoryLightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrevious={previousMemory}
          onNext={nextMemory}
        />
      )}
    </main>
  );
}
