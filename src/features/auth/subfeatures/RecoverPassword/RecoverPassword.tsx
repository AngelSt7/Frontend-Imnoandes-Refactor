'use client'

import { useState } from "react";
import { AuthOtp } from "@/src/features/auth/interfaces";
import { AssignPassword, TokenPassword } from "./components";

export interface StatusOrquestPassword {
  tokenId: AuthOtp['token'];
  valid: boolean;
}

export function RecoverPassword({ token } : { token: AuthOtp['token'] }) {
  const [statusOrquestPassword, setStatusOrquestPassword] = useState<StatusOrquestPassword>({
    tokenId: '', valid: false
  });

  return (
    <>
      {
        !statusOrquestPassword.valid
          ? <TokenPassword token={token} setStatusOrquestPassword={setStatusOrquestPassword} />
          : <AssignPassword tokenId={statusOrquestPassword.tokenId} />
      }
    </>
  )
}
