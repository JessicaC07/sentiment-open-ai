import './App.css';
import {useState} from 'react';

import { apiKey, endpointCompletion } from './globals/globals';
import ResponseDisplay from './components/ResponseDisplay';

function App() {

  console.log(apiKey)

  const[promptText, setPromptText] = useState('');
  const[responses, setResponses] = useState([]);

  function submit() {
    sendToAi(promptText);
    setPromptText('');
  }

  function sendToAi(text) {
    const data = {
      prompt: `Decide whether a sentence's sentiment is positive, neutral, or negative.

      Sentence: "${text}"
      Sentiment: `,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
      
    fetch(endpointCompletion, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {      
      setResponses([{
        promptText: text,
        response: data.choices[0].text,
        id: data.id
      }, ...responses])
    })
    .catch((error) => {
      alert('Error: ' + error);
    });
  }

  return (
    <div>
      <h1>Jessica's Sentiment AI</h1>
      <label>Enter a Sentence</label>
      <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)}></textarea>
      <button onClick={submit}>Submit</button>
      <h2>Try out some emojis!</h2>
      <span onClick={() => sendToAi('😃')}>😃</span>
      <span onClick={() => sendToAi('😢')}>😢</span>
      <div>
          {/* (moviesToDisplay !== false) && > no need as start with [] */}
          {
              responses.map(responseFromArray => <ResponseDisplay key={responseFromArray.id} prompt={responseFromArray.promptText} response={responseFromArray.response} />)
          }
      </div>
    </div>
  );
}

export default App;
