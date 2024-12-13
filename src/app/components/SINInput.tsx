'use client'

import { useState } from 'react'
import { ValidateSinRequest, ValidateSinResponse } from '../api/types'

export function SINInput() {
  const [sin, setSin] = useState('')
  const [status, setStatus] = useState<'start' | 'loading' | 'valid' | 'invalid'>('start')
  const [error, setError] = useState('')

  const handleValidate = async () => {

    try {
      if (!sin) {
        console.log('No SIN number entered', sin)
        setError('Please enter a SIN number')
        return
      }
      setStatus('loading')
      setError('')
      const requestBody: ValidateSinRequest = { sin };
      const response = await fetch('/api/validate-sin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), //For security reasons we can also encrypt the sin before sending it to the server
      })

      const data = await response.json() as ValidateSinResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Validation failed')
      }

      setStatus(data.isValid ? 'valid' : 'invalid')
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('start');
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setStatus('start');
    
    const digitsOnly = e.target.value.replace(/[^0-9]/g, '');

    const formatted = digitsOnly.replace(/(\d{3})(?=\d)/g, '$1-');
    
    if (digitsOnly.length <= 9) {
      setSin(digitsOnly);
      e.target.value = formatted;
    }
  }

  const handleClear = () => {
    setSin('');
    setStatus('start');
    setError('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };



  return (
    <div className={"space-y-6"}>
      <div className="space-y-4">
        <div className="space-y-2 relative">
          <input
            type="text"
            placeholder="XXX-XXX-XXX"
            className="w-full text-center px-4 py-2 border rounded-full 
                      focus:ring-0 focus:border-primary focus:outline-none
                      tracking-widest"
            maxLength={11}
            inputMode="numeric"
            value={sin.replace(/(\d{3})(?=\d)/g, '$1-')}
            onChange={handleNumberChange}
            onKeyDown={handleKeyDown}
          />
          {sin && (
            <button
              onClick={handleClear}
              className="absolute right-0 mr-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleValidate}
          disabled={status === 'loading'}
          className="w-full px-4 py-2 text-white bg-primary rounded-full hover:bg-white hover:text-primary border hover:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Validating...' : 'Validate SIN'}
        </button>
      </div>

      {status === 'valid' && (
        <div className="text-center text-sm text-green-600 font-medium">
          Valid SIN number
        </div>
      )}

      {status === 'invalid' && (
        <div className="text-center text-sm text-red-600 font-medium">
          Invalid SIN number
        </div>
      )}

      {error && (
        <div className="text-center text-sm text-red-600 font-medium">
          {error}
        </div>
      )}
    </div>
  )
} 