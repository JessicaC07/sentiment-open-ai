import '../ResponseDisplay.css';

function ResponseDisplay({prompt, response}) {
  return (
    <div className="response">
        <div><span className="label">What you entered: </span>{prompt}</div>
        <div><span className="label">Sentiment: </span>{response}</div>
    </div>
  )
}

export default ResponseDisplay;
