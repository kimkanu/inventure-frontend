import React, { FunctionComponent } from 'react';
import { LoremIpsum } from 'lorem-ipsum';

export const LongContent: FunctionComponent = () => {
  return (
    <p
      style={{
        marginBottom: '56px',
      }}
    >
      {new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4,
        },
        wordsPerSentence: {
          max: 16,
          min: 4,
        },
      }).generateParagraphs(26)}
    </p>
  );
};
