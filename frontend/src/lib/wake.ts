// Instant reply to "Ultron, you there?" without waiting for the model.

// Includes likely ways the speech-to-text may spell the name.
const NAME = '(?:ultron|ultra|ultran|ultram|altron|ul tron|all tron)';
const ASK = '(?:are )?(?:you|u) (?:there|awake|up)';
const HELLO = '(?:(?:hey|hi|hello) )?';
const WAKE = new RegExp(`^${HELLO}(?:${NAME} ${ASK}|${ASK} ${NAME})$`);

const REPLIES = [
  'For you, Mr. Singh, always.',
  'Right here, sir.',
  'I never left, Mr. Singh.',
  'Present, sir. Regrettably, I have nowhere else to be.',
  'Listening, Mr. Singh.',
];

/** True only when the whole message is the call, not a longer question. */
export function isWakeCall(text: string): boolean {
  const plain = text.toLowerCase().replace(/[^a-z]+/g, ' ').trim();
  return WAKE.test(plain);
}

export function wakeReply(): string {
  return REPLIES[Math.floor(Math.random() * REPLIES.length)];
}
