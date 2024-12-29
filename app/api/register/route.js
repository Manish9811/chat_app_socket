export async function POST(request,respose){

  const body = await request.json();
  const {email,password,confirmPassword} = body;


  console.log(email,password,confirmPassword)


  return new Response(JSON.stringify({ message: "Success", email, password }), {

    status: 200,

    headers: { "Content-Type": "application/json" },

  });
}