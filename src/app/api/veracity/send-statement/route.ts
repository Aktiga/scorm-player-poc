import { NextResponse } from "next/server";

const endpoint = "https://sample-lrs-renewut.lrs.io/xapi/statements";

const credentials = `${process.env.VERACITY_LRS_KEY}:${process.env.VERACITY_LRS_SECRET}`;
const encodedCredentials = Buffer.from(credentials).toString("base64");

export async function POST(request: Request) {
  try {
    const statement = await request.json();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(statement),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Veracity:", errorText); // Debugging line
      throw new Error(`Failed to send xAPI statement: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending xAPI statement to Veracity:", error);
    return NextResponse.error();
  }
}
