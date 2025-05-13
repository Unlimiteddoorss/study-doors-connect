
import * as React from "react"
import { ToastActionElement, type ToastProps as RadixToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

export type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive" | "success"
  open?: boolean
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts = new Map<string, ToasterToast>()

const listeners = new Set<(toasts: Map<string, ToasterToast>) => void>()

function subscribe(listener: (toasts: Map<string, ToasterToast>) => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function publish() {
  listeners.forEach((listener) => {
    listener(new Map(toasts))
  })
}

export interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive" | "success"
  action?: ToastActionElement
}

function addToast(options: ToastOptions) {
  const id = genId()

  const update = (props: ToasterToast) =>
    updateToast({ ...props, id })

  const dismiss = () => {
    removeToast({ id })
  }

  const toast = {
    id,
    title: options.title,
    description: options.description,
    action: options.action,
    variant: options.variant,
    open: true,
  }

  toasts.set(toast.id, toast)
  publish()

  return {
    id: toast.id,
    dismiss,
    update,
  }
}

function updateToast(toast: ToasterToast) {
  if (!toast.id) return

  toasts.set(toast.id, { ...toast })
  publish()
}

function removeToast(toast: Pick<ToasterToast, "id">) {
  const toastToRemove = toasts.get(toast.id)
  if (!toastToRemove) return

  if (toastToRemove.open === false) {
    toasts.delete(toast.id)
    publish()
    return
  }

  toasts.set(toast.id, {
    ...toastToRemove,
    open: false,
  })
  publish()

  setTimeout(() => {
    toasts.delete(toast.id)
    publish()
  }, TOAST_REMOVE_DELAY)
}

function dismissToast(toastId?: string) {
  if (toastId) {
    removeToast({ id: toastId })
  } else {
    toasts.forEach((_, id) => {
      removeToast({ id })
    })
  }
}

export function useToast() {
  const [state, setState] = React.useState<Map<string, ToasterToast>>(toasts)

  React.useEffect(() => {
    const unsubscribe = subscribe(setState)
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    toast: addToast,
    dismiss: dismissToast,
    toasts: Array.from(state.values()),
  }
}

export const toast = {
  ...addToast,
  dismiss: dismissToast,
}
