import React, { useState } from "react";

export function SuccessButton({ summary }) {
  const [submitted, setSubmitted] = useState(false);
  console.log("reloading, summary:", summary, "submitted:", submitted);

  function submit() {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    window.plausible("Success", { props: { summary } });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  }

  if (submitted) {
    return (
      <button className="button is-fullwidth is-large" disabled>
        Thanks!
      </button>
    );
  } else {
    return (
      <button
        className="button is-fullwidth is-large is-success"
        onClick={submit}
      >
        Could you read it?
      </button>
    );
  }
}
