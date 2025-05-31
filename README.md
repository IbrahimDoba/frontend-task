Weather App 🌤️
A clean, modern weather app that lets you check the weather anywhere in the world. Built with Next.js and powered by WeatherAPI.com.

What it does
Browse popular cities - See weather for major cities on the homepage
Search any location - Find weather for any city with smart autocomplete
3-day view - Check yesterday, today, and tomorrow's forecast
Chat with weather bot - Ask "What's the weather in Tokyo?" and get instant results
Dark/light mode - Switch themes or use your system preference
Built with
Next.js 14 - React framework
TypeScript - For better code
Tailwind CSS - Styling
shadcn/ui - UI components
WeatherAPI.com - Weather data
Getting started
You'll need
Node.js 18+
A free API key from WeatherAPI.com
Setup
Clone and install

git clone https://github.com/IbrahimDoba/frontend-task
cd weather-app
pnpm install
Add your API key Create a .env.local file:

WEATHERAPI_KEY=your_api_key_here
Set up UI components

pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input skeleton dropdown-menu popover command
Run it

pnpm dev
Open http://localhost:3000 and you're good to go!

How the chat works
The weather bot is pretty smart! It can understand questions like:

"What's the weather in Paris?"
"How's it looking in Tokyo?"
"Weather for New York"
It'll extract the city name and give you a direct link to that location's weather page.

Deploy it
The easiest way is with Vercel:
