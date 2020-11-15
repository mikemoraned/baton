import React, { useState } from "react";

export function CategoryButton({
  summary,
  eventName,
  onSubmitted,
  className,
  children,
}) {
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    window.plausible(eventName, { props: { summary } });
    console.log("Submitted", eventName, "for", summary);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSubmitted();
    }, 500);
  }

  if (submitted) {
    return (
      <button className="button" disabled>
        Thanks!
      </button>
    );
  } else {
    return (
      <button className={`button ${className}`} onClick={submit}>
        {children}
      </button>
    );
  }
}
