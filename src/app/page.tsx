import Image from 'next/image'
import styles from './page.module.css'
import { Button } from '@/components/Button/Button'

export default function Home() {
  return (
    <>
      <h1 className="govuk-heading-xl">Default page template</h1>
      <Button>Start Now</Button>
    </>
  )
}
