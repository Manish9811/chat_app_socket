import validator from 'validator';

export async function POST(request, response) {

  try {

    const body = await request.json();

    const { email, password } = body;


    if (validator.isEmail(email)) {

      return new Response(JSON.stringify({ message: "Success", email, password }), {

        status: 200,

        headers: { "Content-Type": "application/json" },

      });
    }
    else {

      return new Response(JSON.stringify({ message: "Invalid email address" }), {

        status: 404,

        headers: { "Content-Type": "application/json" },

      });
    }

  } catch (error) {

    return new Response(`Webhook error: ${error.message}`, {

      status: 400,

    })
  }
}