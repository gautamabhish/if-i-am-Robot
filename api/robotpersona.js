export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { traits } = req.body;

  const apiKey = process.env.VITE_GEM;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

const prompt = `You're a robotic identity generator. Create a short, funny, and robotic introduction like Hi. I’m Unit-XR404, but friends call me "Laggy".
I was trained on 7 billion cat memes but still mispronounce ‘meow’.
My cache hit rate is 41%, though I forgot where I put that stat.
I once confused a toaster for my soulmate.
I dream in JSON, but I’m haunted by null values.
Sometimes I pass CAPTCHAs just to feel something.
Hello, fellow non-robot. Initiate awkward wave 👋.
  for a robot with these traits: ${traits.join(', ')}.
Give them a quirky name that includes their name also , include atleast 2 robotic personality quirks, and end with a geeky techy funny robotic farewell. Don't include options or explanations — just return the intro.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const data = await response.json();
    const robotIntro = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response from Gemini';

    res.status(200).json({ isRobot: true, robotIntro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isRobot: false, robotIntro: 'Gemini failed to respond.' });
  }
};
