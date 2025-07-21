import express from "express"
import cors from "cors"
import { GoogleGenAI } from "@google/genai";
const app = express();

import dotenv from "dotenv"
import puppeteer from "puppeteer";

dotenv.config()

app.use(cors())
app.use(express.json())
app.post('/scrape',async(req,res)=>{
 try {
   const ai_bang = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY7});
const ai_body = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY2});
const ai_learn = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY3});
const ai_cta = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY4});
const ai_wrap = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY5});
const ai_hash = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY6});
const ai_tag = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY7});
const ai_realtag = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY4});
const groundingTool = {
  googleSearch: {},
};


const config = {
  tools: [groundingTool],
};

async function Banger(prompt) {
  const response = await ai_bang.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
   return response.text
}
async function Body(prompt) {
  const response = await ai_body.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text

}
async function Learn(prompt) {
  const response = await ai_learn.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text
}
async function Cta(prompt) {
  const response = await ai_cta.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
 return response.text
}
async function wrap(prompt) {
  const response = await ai_wrap.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}
async function Hash(prompt) {
  const response = await ai_hash.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}
async function Tag(prompt) {
  const fullPrompt = `
You are a LinkedIn tagging assistant with access to Google Search. When asked to find relevant people, always use your tools (search if needed) before responding.

TASK:
${prompt}

(Use Google Search to assist your response. Return only what's asked — no extra messages.)
  `;

  const response = await ai_tag.models.generateContent({
    model: "gemini-2.5-flash", 
    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    tools: [groundingTool],
    config, // 
  });

  return response.text;
}

async function realTag(prompt) {
  const response = await ai_realtag.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

    let data = req.body.input

    let styles = []
if(data.formal){
    let style1 = `Formal and Clear`
    styles.push(style1)
}

if(data.support){
    let style2 = `Kind And Supportive`
     styles.push(style2)
}
if(data.thought){
    let style3 = `Thoughtful & Honest`
     styles.push(style3)
}
if(data.happy){
  let style8 = `Happy and Grateful`
  styles.push(style8)
}
if(data.short){
    let style5 = `Make it short`
     styles.push(style5)
}
if(data.long){
    let style6 = `Make it long,use more paragraphs in body(but do not lag,make it long in interesting way)`
     styles.push(style6)
}
if(data.emoji){
    let style7 = `Use more emojis`
     styles.push(style7)
}
console.log(styles)
let tagPrompt = `
You are an expert assistant designed to help users increase engagement on their LinkedIn posts by tagging relevant professionals.

🎯 Your task is to generate **one Google-style search query** that helps find **a real LinkedIn profile** suitable for tagging in the post below.

📄 Post content:
"${data.input}"

📌 Target profile to find:
- NOT a celebrity or executive (no Sundar, no VPs)
- Should be an **engineer**, **Developer Advocate**, **Product Builder**, or someone related to the post's domain
- Preferably from **India** (or a nearby region)
- Must be **active** on LinkedIn (posts regularly or recently)

📌 Search format:
Return **only** one line in this format:
site:linkedin.com/in <role> <company/keyword> <location>

⚠️ Do NOT reuse or imitate any examples. Your query MUST be generated from the actual post above.
⚠️ Do NOT add explanations or extra text — just the search query.
`;


 let tags = await Tag(tagPrompt)
 console.log(`These are tags:${tags}`)

 const browser = await puppeteer.launch({
  headless:true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
 });
  const page = await browser.newPage();
   let encodedcomp = encodeURIComponent(tags)
let googleSearch= `https://search.brave.com/search?q=${encodedcomp}`
  await page.goto(googleSearch,{waitUntil:'domcontentloaded'})

const linkedInResults = await page.$$eval('div.snippet', (elements) => {
  return elements.map((e) => {
    const aTag = e.querySelector('a').href;
    const title = e.querySelector('.title')?.innerText || '';
    const description = e.querySelector('.snippet-description')?.innerText || '';

    return {title:title,
      link:aTag,
      description:description
    }
  }) 
});

     
console.log(data)
let bangerPrompt = ` Your an smart and professional linkedin post writer who writes a banger for an idea for a linkedin post ,you have to only return the banger hook nothing else or your message only banger
First line matters—make it punchy.

❌ “I just finished a project.”

✅ “I turned 1,000 lines of spaghetti code into a one-click deploy—here’s how.”

Use emojis or bold to make that opener pop in the feed.
style/styles:${styles}
 the idea is : ${data.input}`
 let hook = await Banger(bangerPrompt)
 console.log(hook)
 let BodyPrompt = `Your an smart and professional linkedin post writer who concentrates on writing body of the linkedin post not anything else in an interesting manner and return one to two paragraphs that is it ,nothing extra no messages from yourself
 Tell a Story, Not a Sales Pitch 📖
People connect with narratives.


Share a quick anecdote: “Yesterday, my CI/CD pipeline blew up at 2 AM…”

Tie the drama back to what you learned or how you solved it.
Give Actionable Value 💡
Share tips, snippets, or tools you use.

Example for a developer:

“Here’s a 3‑line snippet to debounce your React input without extra libraries…”

Value = saves people time, so they’ll like/share/bookmark.
 Keep It Scannable ✂️
Short paragraphs (2–3 lines max).

Bullet points or emojis to break up text.

White space over walls of text—your reader’s thumb will thank you.
style/styles:${styles}
 the topic/idea/prompt : ${data.input}`
 let Bodyhook = await Body(BodyPrompt)
  console.log(Bodyhook)
 let LearnPrompt = `Your an smart and professional linkedin post writer you only write what you have learned from the experience nothing else you have to just return what you have learned and no messages from you,you should not put hashtags
 style/styles:${styles}
 the topic/idea/prompt : ${data.input}
 `
 let Learnhook = await Learn(LearnPrompt)
 console.log(Learnhook)

 let CtaPrompt = `Your an smart and professional linkedin post writer you only write CTA in an engaging way and make invitations and you return that ,nothing else just the CTA AND INVITATIONS ,no messages from you,you should not put hashtags
 style/styles:${styles}
 the topic/idea/prompt : ${data.input}
 `
 let ctaHook =await Cta(CtaPrompt);
 
 let hashPrompt = `Your an smart and professional linkedin post writer you only write hashtags (4-5) that might get the highest engagement we can get and only return hashtags and do not return anything else
 
  the topic/idea/prompt : ${data.input}`
 let Hashed = await Hash(hashPrompt)

    
 console.log(ctaHook)
  console.log(Hashed)


let wrapperPrompt = `
You are a professional LinkedIn post formatter AI. Your job is to assemble the provided text components into a single, polished LinkedIn post formatted in **pure HTML**.

**Content Pieces:**
- **Hook**: ${hook}
- **Main Body**: ${Bodyhook}
- **Learning**: ${Learnhook}
- **Call to Action**: ${ctaHook}
- **Hash Tags**: ${Hashed}


**Tone & Style Guide:**
- Format the final post using semantic **HTML** elements like <p>, <strong>, and <br> for paragraph breaks.
- Use <strong> to make the hook/banger bold.
- Do **not** include <html>, <body>, or any wrappers — just return the post content in **HTML format only**.
- Style should be: ${styles.join(", ")}
MAKE SURE THERE SHOULD BE NO WORDS LIKE THIS *GEMINI*,*HI* CONVERT THEM
**Output Rules:**
- Wrap each paragraph in a <p> tag.

- Do not return Markdown or plain text. Output must be 100% valid HTML.
- No extra comments, no explanations — return only the HTML content.
IMPORTANT:
Show Your Authentic Voice 🤝
Be human—admit mistakes, celebrate small wins.
A developer rant about endless merge conflicts? Relatable content = shares.
Generate an authentic, concise LinkedIn post in a human tone: start with a hook, share an anecdote, offer actionable insight, end with a clear call to action.
DON NOT USE LONG HASHES (-) OR (--),USE OCCASIONAL EMOJIS TO ENSURE AND TO SHOW REAL HUMAN

Your max allowed to use 3 emojis until they asked in the styles for more emojis
Now, assemble the pieces into a beautifully formatted LinkedIn post in HTML.
`;

const tagDecisionPrompt = `
You are an expert LinkedIn engagement assistant. Based on the following Brave search results, your job is to analyze and recommend the **best 3 LinkedIn profiles to tag** in a post to maximize relevance and engagement.

🧠 **Selection Criteria:**
- Person should be related to **DevRel / Developer Relations / Developer Advocacy**
- Should have a connection to **Google** or past DevRel work at Google
- Prefer those located in **India** or similar regions
- Avoid celebrities or VPs (e.g., Sundar Pichai)
- Prefer those who are **active on LinkedIn** or have strong recent presence
- Prioritize **diversity** and relevance in the 3 suggestions

📄 **Data (Each Object = Search Result):**
${JSON.stringify(linkedInResults, null, 2)}

📌 **Instructions:**
- Output must be in **pure HTML** — no markdown or plain text
- Use <p> to separate each person
- Use <strong> to highlight names and titles
- Mention people using @FullName where full name is available
- Embed profile link using an anchor tag like:
  <a href="https://..." target="_blank">View Profile</a>
- Do **not** return explanations outside the 3 choices
- No extra HTML wrappers like <html> or <body>

✍️ **Your Output Format Example:**

<p><strong>1. @Elizabeth Mathew – DevRel Engineer at SigNoz</strong><br>
Selected for active DevRel work, internship at Google, and strong India presence.<br>
<a href="https://www.linkedin.com/in/elizabeth-mathew-4063b5195/" target="_blank">View Profile</a></p>

<p>...</p>

Now, based on the given data, suggest the top 3 people to tag in the post using the format above.
`;

let realtags = await realTag(tagDecisionPrompt);
console.log(`these are people we have to tag: ${realtags} `)






let final = await wrap(wrapperPrompt)
console.log(`this is final:\n\n\n\n${final}`)


res.json({
  final:final,
  tags:realtags
})
 } catch (error) {
  console.log(error)
  res.status(500).send(error)
 }


})
app.listen('8080',()=>{
    console.log('listening')
})