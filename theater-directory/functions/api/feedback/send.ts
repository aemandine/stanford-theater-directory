interface Env {
  FEEDBACK: KVNamespace
}

interface FeedbackInput {
  message: string
}

class Feedback {
  message: string = ""
  date: Date = new Date()

  constructor(message: string) {
    this.message = message
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    // Make sure it's a post request
    if (context.request.method !== "POST") {
      return new Response(null, { status: 405 })
    }
    // Authenticate
    const authVerify = await fetch(
      "https://unofficialtheater.directory/api/auth/verify",
      { headers: context.request.headers }
      )
    const { userId }: { userId: string | null } = await authVerify.json()
    if (userId === null) {
      return new Response(null, { status: 401 })
    }
    const feedbackInput: FeedbackInput = await context.request.json()
    const feedback = new Feedback(feedbackInput.message)
    await context.env.FEEDBACK.put(crypto.randomUUID(), JSON.stringify(feedback))
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}