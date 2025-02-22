"use client";

import { useState } from "react";

export default function Main() {
  const [response, setResponse] = useState(null);

  const sendData = async () => {
    const data = {
      version:
        "00430f0bd52a14f794e379250e0619c3ea882588ad118162e6e2f4391042329d",
      input: {
        model: "dev",
        prompt:
          "a firedancer dancing in a Japanese tea room with matcha brewing in a teapot",
        go_fast: false,
        lora_scale: 1,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        guidance_scale: 3,
        output_quality: 80,
        prompt_strength: 0.8,
        extra_lora_scale: 1,
        num_inference_steps: 20,
      },
    };

    try {
      const res = await fetch("/api/replicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
      setResponse(result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={sendData}>Send Data</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
