// "Ask me anything" Q&A. Answers live in _data/answers.json.
function initAsk(answers) {
  const messages = document.getElementById("chatMessages");
  const typing = document.getElementById("chatTyping");
  const prompts = document.querySelectorAll("[data-question]");
  if (!messages || !typing) {
    return;
  }
  let busy = false;

  function addMessage(text, direction) {
    const message = document.createElement("p");
    message.className = "chat-msg chat-msg-" + direction;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  prompts.forEach(function (prompt) {
    prompt.addEventListener("click", async function () {
      const answer = answers[prompt.dataset.question];
      if (busy || !answer) {
        return;
      }

      busy = true;
      prompts.forEach(function (other) {
        other.classList.toggle("is-selected", other === prompt);
      });
      addMessage(prompt.textContent, "out");
      typing.hidden = false;
      messages.scrollTop = messages.scrollHeight;
      await wait(900);
      typing.hidden = true;
      addMessage(answer, "in");
      busy = false;
    });
  });
}
