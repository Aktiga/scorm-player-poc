export const sendStatement = async (statement: any) => {
  try {
    const response = await fetch("/api/veracity/send-statement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statement),
    });

    if (!response.ok) {
      throw new Error("Failed to send xAPI statement");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending xAPI statement to Veracity:", error);
    throw error;
  }
};

export const getStatements = async (
  userId: string,
  contentUrl: string,
  verbId: string
) => {
  try {
    const params = new URLSearchParams({
      agent: JSON.stringify({ mbox: `mailto:${userId}@example.com` }),
      verb: verbId,
      activity: contentUrl,
    });

    const response = await fetch(
      `${process.env.VERACITY_LRS_ENDPOINT}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("your-lrs-username:your-lrs-password"),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch xAPI statements");
    }

    const data = await response.json();
    return data.statements;
  } catch (error) {
    console.error("Error fetching statements:", error);
    return [];
  }
};
