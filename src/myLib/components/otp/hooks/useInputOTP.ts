import { useEffect, useState } from "react"
import { useOtpUi } from "./useOtpUi"
import { useSubmitMutation } from "@/src/hooks"
import { Payload, UseInputOTP } from "../interfaces/interface"

export const useInputOTP = ({ serviceFunction, onSuccessCallback, token } : UseInputOTP) => {
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

      return {
        otp,
        setOtp,
        Slot,
        FakeDash
      }
}