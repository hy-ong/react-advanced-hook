import { useRef, useState } from "react"
import { AlertArgs, AlertHooks } from "../../types/alert"

export default function useAlert(): AlertHooks {
  const [args, setArgs] = useState<AlertArgs>({} as AlertArgs)

  const refDialog = useRef<HTMLDialogElement | null>(null)
  const refCb = useRef<() => void>()

  const open = (args: AlertArgs, cb?: () => void): void => {
    refDialog.current?.showModal()
    setArgs(args)
    refCb.current = cb
  }

  const close = (): void => {
    refDialog.current?.close()
    refCb.current?.()
  }

  return { refDialog, args, open, close }
}
