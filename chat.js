const coll = document.getElementsByClassName("collapsible");

const addCollapsibleEventListeners = () => {
  for (const item of coll) {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      const content = item.nextElementSibling;
      content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
    });
  }
};

const getTime = () => {
  const today = new Date();
  const time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return time;
};

let firstMessage = "Hello, I'm chatbot AN! I will assist you in any question you have about Nderim Ajdari";
document.getElementById("botStarterMessage").innerHTML = `<p class="botText"><span>${firstMessage}</span></p>`;

let time = getTime();
$("#chat-timestamp").append(time);
document.getElementById("userInput").scrollIntoView(false);

let questionQueue = [];
let isAnsweringQuestion = false;
let intervalId = null;
let scrollIntervalId = null;

const displayTypingAnimation = (botResponse) => {
  let i = 0;
  intervalId = setInterval(() => {
    $(".botText:last span").text(`${botResponse.slice(0, i)}${i % 2 === 0 ? "_" : ""}`);
    i++;

    if (i > botResponse.length) {
      clearInterval(intervalId);

      setTimeout(() => {
        $(".botText:last span:not(:last-child)").fadeOut("slow");
      }, 2000);

      displayBotResponse(botResponse);
      clearQuestionQueue();
      clearInterval(scrollIntervalId);
    }
  }, 150);
};

const displayBotResponse = (botResponse) => {
  let botHtml = `<p class="botText"><span>${botResponse}</span></p>`;
  $(".botText:last").replaceWith(botHtml);
};

const clearQuestionQueue = () => {
  isAnsweringQuestion = false;
  processQuestionQueue();
};

const getHardResponse = (userText) => {
  let botResponse = getBotResponse(userText);
  let botHtml = `<p class="botText"><span>|</span></p>`;

  $(".userText:last").after(botHtml);
  displayTypingAnimation(botResponse);

  scrollIntervalId = setInterval(() => {
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }, 10);
};

const queueQuestion = async (userText) => {
  questionQueue.push(userText);
  await processQuestionQueue();
};

const processQuestionQueue = async () => {
  if (questionQueue.length > 0 && !isAnsweringQuestion) {
    isAnsweringQuestion = true;
    const question = questionQueue.pop();
    clearInterval(intervalId);
    clearInterval(scrollIntervalId);
    await getHardResponse(question);
    await processQuestionQueue();
    isAnsweringQuestion = false;
  }
};

const getResponse = () => {
  let userText = $("#textInput").val();

  if (userText.trim() === "") {
    return;
  }

  let userHtml = `<p class="userText"><span>${userText}</span></p>`;

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  queueQuestion(userText);
};

const buttonSendText = (sampleText) => {
  let userHtml = `<p class="userText"><span>${sampleText}</span></p>`;

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
};

const sendButton = () => {
  getResponse();
};

$("#textInput").keypress((e) => {
  if (e.which === 13) {
    getResponse();
  }
});
