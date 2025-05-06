import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import QRCode from "react-qr-code"

export default function IAFirstLevel() {
  const [step, setStep] = useState(0)
  const [input, setInput] = useState("")
  const [answers, setAnswers] = useState([])
  const [levelTwoReady, setLevelTwoReady] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [generatedStory, setGeneratedStory] = useState("")
  const [levelThreeReady, setLevelThreeReady] = useState(false)
  const [creationPrompt, setCreationPrompt] = useState("")
  const [creationOutput, setCreationOutput] = useState("")
  const [levelFourReady, setLevelFourReady] = useState(false)
  const [aiMistake, setAiMistake] = useState("")
  const [levelFiveReady, setLevelFiveReady] = useState(false)
  const [finalIdea, setFinalIdea] = useState("")
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [animationClass, setAnimationClass] = useState("opacity-0")

  useEffect(() => {
    const savedName = localStorage.getItem("ia_user")
    if (savedName) {
      setName(savedName)
      setShowNameInput(false)
    }
  }, [])

  const handleSubmit = () => {
    if (input.trim().length > 0) {
      setAnswers([...answers, input.trim()])
      setInput("")
      setStep(step + 1)
    }
  }

  const handleGenerate = () => {
    const story = `C'era una volta ${name || "un ragazzo"}, che amava gli insetti. Un giorno trovò un robot parlante nello zaino. Iniziò così un'avventura spaziale.`
    setGeneratedStory(story)
    setLevelTwoReady(true)
  }

  const handleCreation = () => {
    const output = `Hai chiesto all’IA di creare: ${creationPrompt}. Ecco il risultato della tua fantasia digitale.`
    setCreationOutput(output)
    setLevelThreeReady(true)
  }

  const handleMistakeSubmit = () => {
    if (aiMistake.trim().length > 0) {
      setLevelFourReady(true)
    }
  }

  const handleFinalSubmit = () => {
    if (finalIdea.trim().length > 0) {
      setLevelFiveReady(true)
    }
  }

  const handleNameSet = () => {
    if (name.trim().length > 0) {
      localStorage.setItem("ia_user", name)
      setShowNameInput(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setAnimationClass("opacity-100 transition-opacity duration-1000"), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`p-4 max-w-xl mx-auto ${animationClass} font-sans bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg`}>
      {showNameInput ? (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Benvenuto nell'avventura dell'IA!</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Scrivi il tuo nome per iniziare..."
            className="border rounded p-2 w-full mb-2"
          />
          <Button onClick={handleNameSet} className="w-full">Inizia</Button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">🟢 LIVELLO 1 – IL RISVEGLIO</h1>

          {step === 0 && (
            <Card className="mb-4">
              <CardContent>
                <p>
                  Ti sei appena svegliato e lo zaino brilla. Una voce misteriosa ti parla:<br />
                  <em>\"Benvenuto, {name}. Sei stato scelto per diventare un Maestro dell'IA.\"</em><br />
                  <strong>Missione:</strong> Scrivi 3 cose che usi ogni giorno e che funzionano grazie all'intelligenza artificiale.
                </p>
              </CardContent>
            </Card>
          )}

          {step < 3 && (
            <div className="mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Es. YouTube, Alexa, ChatGPT..."
                className="border rounded p-2 w-full mb-2"
              />
              <Button onClick={handleSubmit} className="w-full">Invia</Button>
            </div>
          )}

          {answers.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Hai scritto:</h2>
              <ul className="list-disc list-inside">
                {answers.map((ans, idx) => (
                  <li key={idx}>{ans}</li>
                ))}
              </ul>
            </div>
          )}

          {step === 3 && !levelTwoReady && (
            <Card className="bg-green-100 mb-4">
              <CardContent>
                <h2 className="text-xl font-bold mb-2">🎉 Complimenti!</h2>
                <p>Hai sbloccato il potere: <strong>Occhio Critico</strong> 🔍</p>
              </CardContent>
            </Card>
          )}

          {step === 3 && !levelThreeReady && (
            <>
              <h2 className="text-xl font-bold">🔵 LIVELLO 2 – Le Parole Sono Potere</h2>
              <p className="mt-2">
                Esempio: \"Scrivi una storia in cui il protagonista si chiama {name}, ha 11 anni, ama gli insetti e trova un robot parlante.\"
              </p>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Scrivi il tuo prompt..."
                className="border rounded p-2 w-full my-2"
              />
              <Button onClick={handleGenerate} className="w-full">Genera</Button>
              {generatedStory && <Card className="bg-blue-100 my-4"><CardContent>{generatedStory}</CardContent></Card>}
            </>
          )}

          {levelTwoReady && !levelFourReady && (
            <>
              <h2 className="text-xl font-bold">🟠 LIVELLO 3 – Creazione: Disegna il tuo mondo</h2>
              <input
                type="text"
                value={creationPrompt}
                onChange={(e) => setCreationPrompt(e.target.value)}
                placeholder="Descrizione, immagine, storia o gioco..."
                className="border rounded p-2 w-full my-2"
              />
              <Button onClick={handleCreation} className="w-full">Crea con l'IA</Button>
              {creationOutput && <Card className="bg-yellow-100 my-4"><CardContent>{creationOutput}</CardContent></Card>}
            </>
          )}

          {levelThreeReady && !levelFiveReady && (
            <>
              <h2 className="text-xl font-bold">🔴 LIVELLO 4 – Verità: Non è tutto oro</h2>
              <p>Scrivi un esempio in cui l’IA potrebbe sbagliare o creare confusione.</p>
              <input
                type="text"
                value={aiMistake}
                onChange={(e) => setAiMistake(e.target.value)}
                placeholder="Esempio di errore dell'IA"
                className="border rounded p-2 w-full my-2"
              />
              <Button onClick={handleMistakeSubmit} className="w-full">Invia</Button>
            </>
          )}

          {levelFourReady && !levelFiveReady && (
            <>
              <h2 className="text-xl font-bold">🟣 LIVELLO 5 – Maestria: Cambia il mondo</h2>
              <p>Proponi un’idea con l’IA per migliorare il mondo o la vita delle persone.</p>
              <input
                type="text"
                value={finalIdea}
                onChange={(e) => setFinalIdea(e.target.value)}
                placeholder="La tua idea finale con l'IA"
                className="border rounded p-2 w-full my-2"
              />
              <Button onClick={handleFinalSubmit} className="w-full">Completa la missione</Button>
            </>
          )}

          {levelFiveReady && (
            <>
              <h2 className="text-2xl font-bold text-center mt-6">🎓 Certificato Ufficiale</h2>
              <p className="text-center mb-4">Congratulazioni, {name}! Sei un <strong>Mini Maestro dell’IA</strong>.</p>
              <div className="flex justify-center bg-white p-4">
                <QRCode value={`https://certificati.gsc.ai/user/${name}`} />
              </div>
              <p className="text-center mt-2 text-sm italic">Scansiona il QR Code per mostrare il tuo certificato!</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
