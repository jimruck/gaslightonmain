'use client'

import { Printer } from 'lucide-react'

export function PrintMenuButton() {
  const handlePrintMenu = () => {
    // In a real implementation, this would generate a PDF or open a print-friendly version
    window.print()
  }

  return (
    <button
      onClick={handlePrintMenu}
      className="btn-secondary inline-flex items-center space-x-2"
    >
      <Printer className="h-5 w-5" />
      <span>Print Menu</span>
    </button>
  )
}
