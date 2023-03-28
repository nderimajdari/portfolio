let userName = "";
let userEmri = "";

const preTrainedAnswers = {
    "Pershendetje":["Pershendetje, si mund te ju ndihmoj?", "Pershendetje, cfare ju duhet?", "Mirëmëngjesi, si mund t'ju ndihmoj?"],
    
    "hello ":[" hey, what’s up ", " hi, what’s up ", " hello! There, How can I help you today?"],
    "hey ":["hi ", " Hello! How can I help you today?", " hey "],
    "hi ":[" hello ", " hey ", " hi "],
    "how are you ":[" I'm just a computer program, so I don't have feelings or physical sensations. But thank you for asking. How can I help you today?", " I am an AI and do not have the ability to feel emotions, but thank you for asking. How can I assist you?", " I’m good, thanks. How can I help you today?"],

    "default":"I'm sorry, My training data does not include the information you're asking for. Could you please try asking a different question?"
};

function getBotResponse(input) {
  input = input.toUpperCase();
  input = input.toLowerCase();
  if (input.startsWith("my name is ")) {
    const name = input.replace("my name is ", "");
    const responses = [
      `Nice to meet you ${name}! how can I help you today?`,
      `Hey ${name}! how can I help you today?`,
      `Hello ${name}! how can I help you today?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (input.startsWith("emri im eshte ")) {
    const emri = input.replace("emri im eshte ", "");
    const responses = [
      `Gëzohem që ju njoha ${emri}! si mund të ju ndihmojë?`,
      `Përshëndetje ${emri}! çfarë mund të bëj për ju?`,
      `Tung ${emri}! a mund të bëj ndonjë gjë për ju?`,
      `Çkemi ${emri}! çfarë duhet të bëj për ju?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  let response = preTrainedAnswers[input];
  if(!response){
    response = preTrainedAnswers["default"];
  }
  else{
    response = response[Math.floor(Math.random()*response.length)];
  }

  if (userName) {
    response = response.replace("Hello ", `Nice to meet you ${userName}! Hello `);
  }

  if (userEmri) {
    response = response.replace("Hello ", `Gëzohem që ju njoha ${userEmri}! Hello `);
  }
  return response;
}
