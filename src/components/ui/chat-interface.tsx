"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import type { ChatMessage } from "@/types/weather"
import { v4 as uuidv4 } from "uuid"

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        'Hello! I can help you check the weather. Try asking something like "What\'s the weather in Tokyo?" or "How\'s the weather in New York?"',
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userInput = input.trim()
    console.log("User input:", userInput) // Debug log

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: userInput,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // Process the message and generate a response
    try {
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const cityName = extractCityName(userInput)
      console.log("Extracted city name:", cityName) // Debug log

      let botMessage: ChatMessage

      if (cityName) {
        botMessage = {
          id: uuidv4(),
          role: "assistant",
          content: `You can view the weather in ${cityName} here:`,
          cityLink: cityName,
        }
        console.log("Bot message with city link:", botMessage) // Debug log
      } else {
        botMessage = {
          id: uuidv4(),
          role: "assistant",
          content: "I'm sorry, I couldn't identify a city in your message. Please try asking about the weather in a specific city like 'What's the weather in London?' or 'How's the weather in Paris?'",
        }
        console.log("Bot message without city:", botMessage) // Debug log
      }

      setMessages((prev) => {
        const newMessages = [...prev, botMessage]
        console.log("Updated messages:", newMessages) // Debug log
        return newMessages
      })
    } catch (error) {
      console.error("Error processing message:", error)
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  // Improved NLP to extract city name from user input
  const extractCityName = (input: string): string | null => {
    const cleanInput = input.toLowerCase().trim()
    console.log("Processing input:", cleanInput) // Debug log
    
    // Common patterns for weather queries
    const patterns = [
      /weather\s+in\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /how'?s\s+the\s+weather\s+in\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /what'?s\s+the\s+weather\s+in\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /weather\s+(?:for|at)\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /temperature\s+in\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /forecast\s+(?:for|in)\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
      /check\s+weather\s+in\s+([A-Za-z\s]+?)(?:\?|$|[.,!])/i,
    ]

    for (const pattern of patterns) {
      const match = input.match(pattern)
      if (match && match[1]) {
        const cityName = match[1].trim()
        console.log("Pattern matched:", pattern, "City:", cityName) // Debug log
        return cityName
      }
    }

    // If no pattern matches, try to find a capitalized word that might be a city
    const words = input.split(/\s+/)
    for (const word of words) {
      if (word.length > 2 && 
          word[0] === word[0].toUpperCase() && 
          word[0] !== "I" && 
          !["What", "How", "The", "Weather", "Is", "Are", "Can", "Will", "Where"].includes(word)) {
        console.log("Found potential city by capitalization:", word) // Debug log
        return word
      }
    }

    console.log("No city found") // Debug log
    return null
  }

  const handleCityLinkClick = (cityName: string) => {
    console.log("Navigating to city:", cityName) // Debug log
    router.push(`/city/${encodeURIComponent(cityName)}`)
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Weather Assistant</h2>
        {isProcessing && (
          <p className="text-sm text-muted-foreground">Processing...</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No messages yet
          </div>
        ) : (
          messages.map((message) => {
            console.log("Rendering message:", message) // Debug log
            return (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content ? (
                    <p>{message.content}</p>
                  ) : (
                    <p className="text-red-500">Empty message content</p>
                  )}
                  {message.cityLink && (
                    <div className="mt-2">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 underline"
                        onClick={() => handleCityLinkClick(message.cityLink!)}
                      >
                        View Weather for {message.cityLink}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          placeholder="Ask about the weather in any city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          disabled={isProcessing}
        />
        <Button type="submit" size="icon" disabled={isProcessing || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}