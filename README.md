Weather App 🌤️
A clean, modern weather app that lets you check the weather anywhere in the world. Built with Next.js and powered by WeatherAPI.com.

✨ Features
 Browse Popular Cities – See weather updates for major cities right on the homepage
 Smart Search – Find any city with autocomplete search

 3-Day Forecast – View weather for yesterday, today, and tomorrow

 Weather Chat Bot – Ask things like "What's the weather in Tokyo?"

 Dark/Light Mode – Toggle themes or sync with your system preference

🛠️ Built With
 Next.js 14 – React framework

 TypeScript – Type-safe codebase

 Tailwind CSS – Utility-first styling

 shadcn/ui – Beautiful UI components

 WeatherAPI.com – Real-time weather data

 Getting Started
 Requirements
Node.js v18+

A free API key from WeatherAPI.com

📦 Setup
Clone and install dependencies

bash
Copy
Edit
git clone https://github.com/IbrahimDoba/frontend-task
cd weather-app
pnpm install
Add your API key
Create a .env.local file at the root:

env
Copy
Edit
WEATHERAPI_KEY=your_api_key_here
Set up UI components

bash
Copy
Edit
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input skeleton dropdown-menu popover command
Run the development server

bash
Copy
Edit
pnpm dev
Visit http://localhost:3000 to start using the app!

🤖 How the Weather Chat Works
The chatbot understands natural language queries like:

"What's the weather in Paris?"

"How’s it looking in Tokyo?"

"Weather for New York"

It extracts the city and provides a direct weather result.

📦 Deploy
The easiest way to deploy is with Vercel.
Just push your repo and follow the prompts to set up environment variables.
