'use client'

import { useState, useEffect } from 'react'
import { OTPInput } from 'input-otp'
import { useOtpUi, useSubmitMutation } from '@/src/hooks'
import { Auth } from '@/src/services/auth'
import { useRouter } from 'next/navigation';

export default function InputOtp() {
  const { Slot, FakeDash } = useOtpUi()
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const { mutate } = useSubmitMutation({
    serviceFunction: Auth.confirmAccess,
    onSuccessCallback: (data) => router.replace(data.redirect),
  })

  useEffect(() => {
    if (otp.length === 6) {
      mutate({ token: otp })
    }
  }, [otp])

  return (
    <OTPInput
      maxLength={6}
      value={otp}
      onChange={setOtp}
      containerClassName="group flex items-center has-[:disabled]:opacity-30"
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>

          <FakeDash />

          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
    />
  )
}
