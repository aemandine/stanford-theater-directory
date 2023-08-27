interface Env {
  FEEDBACK: KVNamespace
  EMAIL_API_URL: string
  EMAIL_TOKEN: string
  FEEDBACK_EMAIL_ADDRESS: string
}

interface FeedbackInput {
  message: string
}

class Feedback {
  message: string = ""
  date: Date = new Date()
  userId: string = ""

  constructor(message: string, userId: string) {
    this.message = message
    this.userId = userId
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
    const feedback = new Feedback(feedbackInput.message, userId)
    await context.env.FEEDBACK.put(crypto.randomUUID(), JSON.stringify(feedback))

    // Send me an email about it
    const url = context.env.EMAIL_API_URL
    const headers = {
      "authorization": context.env.EMAIL_TOKEN
    }
    const body = {
      "to": context.env.FEEDBACK_EMAIL_ADDRESS,
      "from": { "email": "info@unofficialtheater.directory", "name": "Theater Directory 🌲" },
      "subject": "Suggestion box!",
      "text": feedbackInput.message
    }
    const resp = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}