'use client'


import { HeaderMenu, StickyContent } from "@/src/myLib";
import Input from "./InputFloating";

const getContent = (lines: number) => {
  return Array.from({ length: lines }, (_, i) => (
    <p key={i}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae deleniti blanditiis tenetur.
      Asperiores suscipit expedita sit quaerat temporibus, sapiente minima eveniet saepe fuga ipsa
      harum quia nisi cum aspernatur ratione!
    </p>
  ));
};

export default function Page() {
  return (
    <>
      {/* Contenido */}
      <div className="mx-auto max-w-7xl mt-5">
        <Input
          htmlFor="input"
          type="text"
          label="Label"
          placeholder="Placeholder"
          variant="floating"
          // errorMessage="Error message"
        />
        <p className="text-gray-800 text-large font-bold">
          Primea linea del contenido
        </p>
        {getContent(50)}
      </div>
    </>
  );
}
