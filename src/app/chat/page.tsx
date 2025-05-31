import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ChatInterface from "@/components/ui/chat-interface"

export default function ChatPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Weather Chat</CardTitle>
          <CardDescription>Ask about the weather in any city and get instant information</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  )
}

export const metadata = {
  title: "Weather Chat",
  description: "Chat with our AI assistant about weather conditions in any city",
}
