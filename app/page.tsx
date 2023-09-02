import Link from 'next/link'


export default function LandingPage() {
  
  
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/param-chat"> {/* Linking to the param-chat.tsx page */}
        <button>Enter Chat</button>
      </Link>

      
      
      
    </div>
    
  )
}
