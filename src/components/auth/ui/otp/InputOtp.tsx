'use client'

import { useState, useEffect } from 'react'
import { OTPInput } from 'input-otp'
import { useOtpUi, useSubmitMutation } from '@/src/hooks'
import { AuthToken } from '@/src/types'

interface InputOtpProps {
  serviceFunction: (data: any) => Promise<any>,
  onSuccessCallback?: (data: any) => any,
  token?: AuthToken['token']
}

interface Payload {
  otp: string,
  token?: AuthToken['token']
}

export default function InputOtp({ serviceFunction, onSuccessCallback, token }: InputOtpProps) {

  const { Slot, FakeDash } = useOtpUi()
  const [otp, setOtp] = useState('')

  const { mutate } = useSubmitMutation({
    serviceFunction,
    onSuccessCallback
  })

  useEffect(() => {
    if (otp.length === 6) {
      const payload: Payload = { otp };
      if (token) payload.token = token;
      mutate(payload);
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
