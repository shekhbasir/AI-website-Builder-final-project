//here i am going  to wrring the  code for the open router

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

export const generateResponse = async (prompt) => {
  try {
    const res = await fetch(openRouterUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,

        messages: [
          {
            role: "system",
            content: "You Must Be return Only valid json row data.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("open router errror" + err);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log("error from generate Response", error);
  }
};
