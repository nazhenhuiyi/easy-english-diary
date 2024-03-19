'use client'

import { Provider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <Provider>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  )
}
