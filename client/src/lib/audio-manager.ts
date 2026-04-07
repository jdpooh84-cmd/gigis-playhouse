/**
 * AudioManager — Singleton for Gigi's Playhouse audio system
 * Handles: theme song, SFX, character voices
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */

const THEME_SONG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/theme-song_9267bafb.mp3";
const THEME_INSTRUMENTAL_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407626762/iASgnCeomTwRZiq44kFhuJ/theme-song-instrumental_d738adeb.mp3";

const FADE_DURATION = 8000; // 8 seconds fade-out

type SFXName = "correct" | "wrong" | "celebrate" | "level-up" | "door-open" | "sparkle" | "movement-bell" | "complete";

class AudioManager {
  private static instance: AudioManager;
  private themeAudio: HTMLAudioElement | null = null;
  private sfxAudios: Map<string, HTMLAudioElement> = new Map();
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private hasPlayedThisSession = false;
  private _isPlaying = false;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  /**
   * Play the theme song on app open (once per session)
   * Respects: settings toggle, device mute, session-once rule
   */
  async playThemeSong(instrumental = false): Promise<void> {
    // Check if already played this session
    if (this.hasPlayedThisSession) return;

    // Check settings
    const settingsRaw = localStorage.getItem("gigi-settings");
    if (settingsRaw) {
      try {
        const settings = JSON.parse(settingsRaw);
        if (settings.playThemeSong === false) return;
      } catch {
        // ignore parse errors
      }
    }

    this.hasPlayedThisSession = true;

    try {
      const url = instrumental ? THEME_INSTRUMENTAL_URL : THEME_SONG_URL;
      this.themeAudio = new Audio(url);
      this.themeAudio.volume = 0.7;
      this.themeAudio.preload = "auto";

      // Attempt playback — will fail silently if device is muted or autoplay blocked
      await this.themeAudio.play();
      this._isPlaying = true;

      // Start fade-out after (duration - FADE_DURATION)
      const duration = this.themeAudio.duration;
      if (duration && duration > FADE_DURATION / 1000) {
        const fadeStartTime = (duration - FADE_DURATION / 1000) * 1000;
        setTimeout(() => this.fadeOut(), fadeStartTime);
      } else {
        // Short track — fade after 80% of duration
        const fadeStartTime = (duration || 45) * 0.8 * 1000;
        setTimeout(() => this.fadeOut(), fadeStartTime);
      }

      this.themeAudio.addEventListener("ended", () => {
        this._isPlaying = false;
      });
    } catch {
      // Autoplay blocked or device muted — graceful skip
      this._isPlaying = false;
    }
  }

  /**
   * 8-second fade-out
   */
  private fadeOut(): void {
    if (!this.themeAudio || this.themeAudio.paused) return;

    const startVolume = this.themeAudio.volume;
    const steps = 80; // 80 steps over 8 seconds = every 100ms
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      if (this.themeAudio) {
        const newVolume = Math.max(0, startVolume - volumeStep * currentStep);
        this.themeAudio.volume = newVolume;

        if (currentStep >= steps) {
          this.themeAudio.pause();
          this.themeAudio.currentTime = 0;
          this._isPlaying = false;
          if (this.fadeInterval) clearInterval(this.fadeInterval);
        }
      }
    }, 100);
  }

  /**
   * Stop theme song immediately
   */
  stopThemeSong(): void {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    if (this.themeAudio) {
      this.themeAudio.pause();
      this.themeAudio.currentTime = 0;
      this._isPlaying = false;
    }
  }

  /**
   * Play a sound effect
   */
  playSFX(name: SFXName): void {
    // SFX are generated via Web Audio API oscillator tones
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const sfxConfig = SFX_CONFIGS[name];
    if (!sfxConfig) return;

    oscillator.type = sfxConfig.type;
    oscillator.frequency.setValueAtTime(sfxConfig.freq, ctx.currentTime);

    if (sfxConfig.freqEnd) {
      oscillator.frequency.linearRampToValueAtTime(sfxConfig.freqEnd, ctx.currentTime + sfxConfig.duration);
    }

    gainNode.gain.setValueAtTime(sfxConfig.volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sfxConfig.duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + sfxConfig.duration);
  }

  /**
   * Speak text using Web Speech API (for character voices)
   */
  speak(text: string, options?: { pitch?: number; rate?: number; voice?: string }): void {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = options?.pitch ?? 1.2;
    utterance.rate = options?.rate ?? 0.9;
    utterance.volume = 0.8;

    if (options?.voice) {
      const voices = speechSynthesis.getVoices();
      const match = voices.find((v) => v.name.includes(options.voice!));
      if (match) utterance.voice = match;
    }

    speechSynthesis.speak(utterance);
  }

  /**
   * Reset session state (for testing)
   */
  resetSession(): void {
    this.hasPlayedThisSession = false;
    this._isPlaying = false;
  }
}

// SFX configurations using Web Audio API oscillator
const SFX_CONFIGS: Record<SFXName, { type: OscillatorType; freq: number; freqEnd?: number; duration: number; volume: number }> = {
  correct: { type: "sine", freq: 523, freqEnd: 784, duration: 0.3, volume: 0.3 },
  wrong: { type: "sawtooth", freq: 300, freqEnd: 200, duration: 0.4, volume: 0.2 },
  celebrate: { type: "sine", freq: 440, freqEnd: 880, duration: 0.6, volume: 0.3 },
  "level-up": { type: "sine", freq: 330, freqEnd: 990, duration: 0.8, volume: 0.3 },
  "door-open": { type: "triangle", freq: 400, freqEnd: 600, duration: 0.5, volume: 0.25 },
  sparkle: { type: "sine", freq: 1200, freqEnd: 2400, duration: 0.2, volume: 0.15 },
  "movement-bell": { type: "sine", freq: 800, duration: 1.0, volume: 0.3 },
  complete: { type: "sine", freq: 523, freqEnd: 1047, duration: 1.0, volume: 0.3 },
};

export const audioManager = AudioManager.getInstance();
export type { SFXName };
