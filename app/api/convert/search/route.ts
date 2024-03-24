export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const url = "https://pro-api.coingecko.com/api/v3/search";
  const res = await fetch(`${url}?query=${query}`, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-pro-api-key": process.env.CG_API_KEY!,
    },
  });

  const queryResponse = await res.json();

  return Response.json({ queryResponse });
}
