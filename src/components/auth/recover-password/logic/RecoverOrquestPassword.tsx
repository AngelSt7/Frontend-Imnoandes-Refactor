'use client'


import { useState } from "react";
import { NewPassword, TokenToResetPassword } from "../steps";
import { AuthOtp } from "@/src/types";

export interface StatusOrquestPassword {
  tokenId: AuthOtp['token'];
  valid: boolean;
}

export default function RecoverOrquestPassword({ token } : { token: AuthOtp['token'] }) {

  const [statusOrquestPassword, setStatusOrquestPassword] = useState<StatusOrquestPassword>({
    tokenId: '',
    valid: false
  });

  return (
    <>
      {
        !statusOrquestPassword.valid
          ? <TokenToResetPassword token={token} setStatusOrquestPassword={setStatusOrquestPassword} />
          : <NewPassword tokenId={statusOrquestPassword.tokenId} />
      }
    </>
  )
}
