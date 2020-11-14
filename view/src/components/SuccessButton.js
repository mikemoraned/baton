import React, { useState } from "react";

export function SuccessButton({ summary }) {
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    window.plausible("Success", { props: { summary } });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <button className="button" disabled>
        Thanks!
      </button>
    );
  } else {
    return (
      <button className="button is-success" onClick={submit}>
        Success?
      </button>
    );
  }
}
