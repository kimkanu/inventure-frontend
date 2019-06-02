import Speech from 'speak-tts';

export const voiceAssistance = new Speech();
voiceAssistance.init({
  volume: 1,
  lang: 'en-GB',
  rate: 1,
  pitch: 1,
  voice: 'Google US English',
  splitSentences: true,
  listeners: {},
});
