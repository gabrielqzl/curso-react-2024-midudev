/* eslint-disable react/prop-types */
import { Link } from '../Link'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description:
      '¡Hola! me llamo Gabriel y estoy creando un clon de React Router.',
  },
  en: {
    title: 'About us',
    button: 'Go to home page',
    description:
      'Hello! My name is Gabriel and I am creating a clone of React Router.',
  },
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <img
        src='https://i1.sndcdn.com/artworks-eeO8OwOANHcDFQ79-DSphlw-t500x500.jpg'
        alt='Gabo'
      />
      <p>{i18n.description}</p>
      <Link to={'/'}>{i18n.button}</Link>
    </>
  )
}
