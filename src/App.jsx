import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex'>
        <div className='flex gap-4 flex-col mx-auto'>
        <Button>Button</Button>
        <Button variant="destructive" size="">Button</Button>
        <Button variant="destructive_outline" size="">Button</Button>
        <Button variant="outline">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="link">Button</Button>
        <Button variant="nav">Button</Button>
        <Button size="sm">Button</Button>
        <Button size="sm" variant="destructive">Button</Button>
        <Button size="sm" variant="destructive_outline">Button</Button>
        <Button size="sm" variant="outline">Button</Button>
        <Button size="sm" variant="secondary">Button</Button>
        <Button size="sm" variant="ghost">Button</Button>
        <Button size="sm" variant="link">Button</Button>
        <Button size="sm" variant="nav">Button</Button>
        </div>
      </div>
    </>
  )
}

export default App
