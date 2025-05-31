"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { SearchResult } from "@/types/weather"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      // Clear existing timeout
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }

      // Don't search if query is too short
      if (searchQuery.length < 3) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      searchTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(`/api/weather/search?query=${encodeURIComponent(searchQuery)}`)
          if (response.ok) {
            const data = await response.json()
            setResults(data)
          }
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        } finally {
          setLoading(false)
        }
      }, 500) // Increased debounce delay for better UX
    },
    []
  )

  useEffect(() => {
    debouncedSearch(query)

    // Cleanup on unmount
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [query, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Open dropdown when user starts typing
    if (value.length > 0 && !open) {
      setOpen(true)
    }
  }

  const handleInputFocus = () => {
    if (query.length > 0) {
      setOpen(true)
    }
  }

  const handleSelect = (location: string) => {
    router.push(`/city/${encodeURIComponent(location)}`)
    setOpen(false)
    setQuery("")
    // Optional: blur the input to hide mobile keyboard
    inputRef.current?.blur()
  }

  const handleSearchClick = () => {
    if (query.length >= 3) {
      handleSelect(query)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length >= 3) {
      handleSelect(query)
    }
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex w-full">
            <Input
              ref={inputRef}
              placeholder="Search for a city..."
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              className="rounded-r-none"
              autoComplete="off"
            />
            <Button
              variant="default"
              className="rounded-l-none"
              onClick={handleSearchClick}
              disabled={query.length < 3}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[300px]" 
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus which can cause issues
        >
          <Command shouldFilter={false}> {/* Disable built-in filtering since we handle it server-side */}
            <CommandList>
              <CommandEmpty>
                {loading ? "Searching..." : query.length < 3 ? "Type at least 3 characters to search" : "No results found."}
              </CommandEmpty>
              {results.length > 0 && (
                <CommandGroup>
                  {results.map((result) => (
                    <CommandItem 
                      key={`${result.name}-${result.id}`} 
                      onSelect={() => handleSelect(result.name)}
                      className="cursor-pointer"
                    >
                      <span>
                        {result.name}, {result.country}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}