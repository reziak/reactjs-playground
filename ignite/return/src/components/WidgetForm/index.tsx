import { useState } from "react";

import bugSvg from "../../assets/bug.svg";
import ideaSvg from '../../assets/idea.svg';
import thoughtSvg from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      src: bugSvg,
      alt: "Imagem de um inseto"
    },
  },
  IDEA: {
    title: "Idéia",
    image: {
      src: ideaSvg,
      alt: "Imagem de uma lampada"
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      src: thoughtSvg,
      alt: "Imagem de um balão de pensamento"
    },
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedbackRestart = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleFeedbackRestart} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              type={feedbackType}
              onFeedbackRestartRequest={handleFeedbackRestart} 
              onFeedbackSent={setFeedbackSent}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-4">
        Feito com ♥ pela <span className="underline underline-offset-2">Rocketseat</span>
      </footer>
    </div>
  )
}