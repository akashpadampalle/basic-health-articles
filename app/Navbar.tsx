import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='space-x-4 bg-blue-300'>
        <Link href='/'>Home</Link>
        <Link href='/create'>Create Article</Link>
    </nav>
  )
}

export default Navbar