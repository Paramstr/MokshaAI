// Importing required modules and functions
import { kv } from '@vercel/kv' // Key-value storage module
import { OpenAIStream, StreamingTextResponse } from 'ai' // OpenAI streaming and response modules
import { Configuration, OpenAIApi } from 'openai-edge' // OpenAI configuration and API modules

import { auth } from '@/auth' // Authentication module
import { nanoid } from '@/lib/utils' // Utility function for generating unique IDs

export const runtime = 'edge' // Setting the runtime environment

// Creating a new configuration for OpenAI API with the API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

// Initializing the OpenAI API with the created configuration
const openai = new OpenAIApi(configuration)

// Defining an asynchronous POST function
export async function POST(req: Request) {
  // Parsing the request body to JSON
  const json = await req.json()
  // Destructuring messages and previewToken from the parsed JSON
  const { messages, previewToken } = json
  // Authenticating the session
  const session = await auth()

  // If the session is null, return an Unauthorized response
  if (session == null) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  // If a previewToken is provided, set it as the API key in the configuration
  if (previewToken) {
    configuration.apiKey = previewToken
  }

  // Creating a chat completion with the OpenAI API
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  // Creating a stream for the chat completion
  const stream = OpenAIStream(res, {
    // Defining an asynchronous function to be called on completion
    async onCompletion(completion) {
      // Extracting the title from the first message content
      const title = json.messages[0].content.substring(0, 100)
      // Extracting the user ID from the session
      const userId = session?.user?.id
      // If a user ID exists
      if (userId) {
        // Generate a unique ID for the chat or use the provided ID
        const id = json.id ?? nanoid()
        // Get the current timestamp
        const createdAt = Date.now()
        // Define the path for the chat
        const path = `/chat/${id}`
        // Define the payload for the chat
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
        // Store the chat payload in the key-value storage
        await kv.hmset(`chat:${id}`, payload)
        // Add the chat to the user's chats in the key-value storage
        await kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      }
    }
  })

  // Return a streaming text response with the chat stream
  return new StreamingTextResponse(stream)
}

