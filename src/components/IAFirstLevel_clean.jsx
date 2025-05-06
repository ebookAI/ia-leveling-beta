
import { useState } from "react"
import QRCode from "react-qr-code"

export default function IAFirstLevel() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [input, setInput] = useState("")
  const [answers, setAnswers] = useState([])
  const [prompt, setPrompt] = useState("")
  const [story, setStory] = useState("")
  const [creation, setCreation] = useState("")
  const [mistake, setMistake] = useState("")
  const [idea, setIdea] = useState("")
  const [level, setLevel] = useState(1)

  const handleName = () => {
    if (name.trim()) setLevel(2)
  }

  const handleInput = () => {
    if (input.trim()) {
      const updated = [...answers, input.trim()]
      setAnswers(updated)
      setInput("")
      if (updated.length === 3) setLevel(3)
    }
  }

  const handlePrompt = () => {
    if (prompt.trim()) {
      const s = `C'era una volta ${name}, che trovò un robot parlante nello zaino. Iniziò così un'avventura speciale.`
      setStory(s)
      setLevel(4)
    }
  }

  const handleCreate = () => {
    if (creation.trim()) setLevel(5)
  }

  const handleMistake = () => {
    if (mistake.trim()) setLevel(6)
  }

  const handleIdea = () => {
    if (idea.trim()) setLevel(7)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>🧪 Debug – Livello attuale: {level}</p>
      <button onClick={() => setLevel(level + 1)} style={{ marginBottom: 20 }}>⏩ Salta livello</button>

      {level === 1 && (
        <>
          <h1>👋 Benvenuto nell'avventura dell'IA!</h1>
          <p>Come ti chiami?</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleName}>Inizia</button>
        </>
      )}

      {level === 2 && (
        <>
          <h2>🟢 LIVELLO 1 – IL RISVEGLIO</h2>
          <p>Scrivi 3 cose che usi ogni giorno e che funzionano grazie all'IA:</p>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleInput}>Invia</button>
          <ul>{answers.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </>
      )}

      {level === 3 && (
        <>
          <h2>🔵 LIVELLO 2 – Le parole sono potere</h2>
          <p>Scrivi un prompt per creare una storia con te come protagonista:</p>
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button onClick={handlePrompt}>Genera</button>
          {story && <p><strong>Storia:</strong> {story}</p>}
        </>
      )}

      {level === 4 && (
        <>
          <h2>🟠 LIVELLO 3 – Crea con l’IA</h2>
          <p>Chiedi all'IA di creare qualcosa:</p>
          <input value={creation} onChange={(e) => setCreation(e.target.value)} />
          <button onClick={handleCreate}>Invia</button>
        </>
      )}

      {level === 5 && (
        <>
          <h2>🔴 LIVELLO 4 – Verità</h2>
          <p>Scrivi un esempio in cui l'IA potrebbe sbagliare:</p>
          <input value={mistake} onChange={(e) => setMistake(e.target.value)} />
          <button onClick={handleMistake}>Continua</button>
        </>
      )}

      {level === 6 && (
        <>
          <h2>🟣 LIVELLO 5 – Maestria</h2>
          <p>Scrivi un'idea per usare l'IA per migliorare la vita di qualcuno:</p>
          <input value={idea} onChange={(e) => setIdea(e.target.value)} />
          <button onClick={handleIdea}>Concludi</button>
        </>
      )}

      {level === 7 && (
        <>
          <h2>🎓 CERTIFICATO</h2>
          <p>Complimenti, {name}! Hai completato tutti i livelli e sei un Mini Maestro dell'IA.</p>
          <QRCode value={`https://certificato.ia/${name}`} />
        </>
      )}
    </div>
  )
}
