import React from "react";

export function SuccessButton({ summary }) {
  function submit() {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    window.plausible("Success", { props: { summary } });
  }

  return (
    <button
      className="button is-fullwidth is-large is-success"
      onClick={submit}
    >
      Could you read it?
    </button>
  );
}
