export async function POST(req: Request) {
  const replicateApiToken = process.env.REPLICATE_API_TOKEN;
  console.log(replicateApiToken);

  try {
    const body = await req.json();
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${replicateApiToken}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify(body),
    });

    console.log("response");

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "API request failed" }), {
        status: response.status,
      });
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
}
