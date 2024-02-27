import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // para recuperar la cita al cargar la página
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response
        console.log(url)
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos </h1>
      <section>
        {fact && <p>{fact}</p>}
        {/* Este img para efectos de visualización por falla del api de imagen de gatos */}
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Black_Cat_%287983739954%29.jpg/1024px-Black_Cat_%287983739954%29.jpg'
          alt='Black Cat'
        />
        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}${image}`}
            alt={`Image extracted using the first three words for ${threeFirstWords}`}
          />
        )}
      </section>
    </main>
  )
}
