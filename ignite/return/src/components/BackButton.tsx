import { ArrowLeft } from "phosphor-react";

export const BackButton = () => {
  return (
    <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" title="Voltar">
      <ArrowLeft weight="bold" className="w-4 h-4" />
    </button>
  )
}