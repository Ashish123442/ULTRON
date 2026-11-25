import { useTtsStore } from './tts';
import { useAppStore } from './store';

const GREETING_ID = 'ultron-greeting';
const DONE_KEY = 'ultron-greeted';

export function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Speak once per window, unless the user clicks or types first. */
export function startGreeting(delayMs = 5000): () => void {
  if (sessionStorage.getItem(DONE_KEY)) return () => {};
  let cancelled = false;
  let timer = 0;
  let tries = 0;

  const detach = () => {
    window.removeEventListener('pointerdown', cancel, true);
    window.removeEventListener('keydown', cancel, true);
  };
  const cancel = () => {
    cancelled = true;
    window.clearTimeout(timer);
    detach();
  };

  const attempt = async () => {
    if (!useAppStore.getState().settings.voiceOutputEnabled) return detach();
    await useTtsStore.getState().ensureHealth();
    if (cancelled) return;
    if (!useTtsStore.getState().available) {
      // The voice may still be loading: try again for about 5 minutes.
      tries += 1;
      if (tries < 30) timer = window.setTimeout(attempt, 10000);
      else detach();
      return;
    }
    sessionStorage.setItem(DONE_KEY, '1');
    const text = `${greetingFor(new Date().getHours())}, Mr. Singh.`;
    await useTtsStore.getState().speak(GREETING_ID, text);
    detach();
    const { error, errorId } = useTtsStore.getState();
    if (errorId === GREETING_ID) console.warn('Ultron greeting failed:', error);
  };

  window.addEventListener('pointerdown', cancel, true);
  window.addEventListener('keydown', cancel, true);
  timer = window.setTimeout(attempt, delayMs);
  return cancel;
}
