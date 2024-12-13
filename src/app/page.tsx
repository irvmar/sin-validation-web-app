import { SINInput } from '@/app/components/SINInput'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            SIN Validator
          </h1>
          <p className="text-sm text-gray-500">
            Enter your Social Insurance Number to validate its authenticity
          </p>
        </div>
        <SINInput />
      </div>
    </div>
  )
}
