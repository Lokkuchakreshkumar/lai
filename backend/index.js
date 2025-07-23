import express from "express"
import cors from "cors"
import { GoogleGenAI } from "@google/genai";
const app = express();

import dotenv from "dotenv"
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth"

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
puppeteer.use(StealthPlugin());

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
async function Tag() {
  const fullPrompt = `
You are a LinkedIn tagging assistant with access to Google Search. When asked to find relevant people, always use your tools (search if needed) before responding.

TASK:
${data.input}

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
You are a tagging assistant for LinkedIn posts.

Your ONLY job is to generate one single **Google-style search query** to find a LinkedIn profile relevant to the given post.

🎯 Instructions:
- ONLY return a search query.
- NO explanations, NO famous people, NO bios.
- Return ONLY one line, in plain text, with no formatting.

🧩 Given Post:
"${data.input}"

✅ Output Format:
site:linkedin.com/in <role> <company or topic> india

⚠️ Do NOT include:
- Names of people (Sundar, Larry, etc.)
- Bullet points or markdown
- Titles like CEO, VP, CFO, or any executives
- Extra commentary or sentences

✅ Example (for internal understanding only — don’t copy this):
site:linkedin.com/in software engineer google india

Final Reminder: Return ONLY the query, in one plain text line. No extras.
`;



 let tags = await Tag(tagPrompt)
 console.log(`These are tags:${tags}`)

 const browser = await puppeteer.launch({
    headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
    '--disable-gpu'
  ],
 });
  const page = await browser.newPage();
   let encodedcomp = encodeURIComponent(tags)
let googleSearch= `https://search.brave.com/search?q=${encodedcomp}`
  await page.goto(googleSearch,{waitUntil:'domcontentloaded'})

const linkedInResults = await page.$$eval('div.snippet', (elements) => {
  return elements.map((e) => {
    const aTag = e.querySelector('a')?.href || "failed to extract";
    const title = e.querySelector('.title')?.innerText || '';
    const description = e.querySelector('.snippet-description')?.innerText || '';

    return {title:title,
      link:aTag,
      description:description
    }
  }) 
});
console.log('Type of linkedInResults:', typeof linkedInResults);
console.log('Is it an Array?', Array.isArray(linkedInResults));

     console.log(`came from puppeteer:${JSON.stringify(linkedInResults)}`)
console.log(data)
let bangerPrompt = `You're a smart and professional LinkedIn post writer who creates scroll-stopping hooks that solve problems and deliver immediate value.
THE OVERALL MUST BE SHORT AND ENGAGING
Your hook MUST:
1. Lead with a PROBLEM or PAIN POINT your audience faces (not your achievement)
2. Promise SPECIFIC VALUE or transformation they'll get
3. Use FRESH angles - avoid overused phrases like "Forget ChatGPT" or generic claims
4. Create genuine CURIOSITY with concrete details, not vague benefits
AT MAX YOU HAVE FREEDOM GENERATE 225 CHARS BANGER HOOK FOR LONG,LESS FOR NO STYLE,EVEN LESS FOR SHORT(IMPORTANT)
HOOK FORMULA:
- Start with the reader's struggle/frustration
- Hint at the surprising solution or result
- Make it specific and credible (numbers, timeframes, concrete outcomes)
DO NOT USE EXAMPLES EXPLICITLY THEY ARE JUST FOR EXAMPLE
Exmaples
❌ "I just built an AI tool"  
✅ "I spent 47 hours manually writing LinkedIn posts until I built something that does it in 30 seconds"

❌ "Forget ChatGPT"  
✅ "ChatGPT gave me generic posts. This gives me posts that get 10x more comments"

Use emojis strategically to break up text and add visual interest.
Return ONLY the banger hook - nothing else.

Style: ${styles}
The idea: ${data.input}`
 let hook = await Banger(bangerPrompt)
 console.log(hook)
let BodyPrompt = `
You are a smart and professional LinkedIn content writer agent. Your job is to generate ONLY the **body section** of a LinkedIn post that drives engagement through concrete value and proof.
THE OVERALL CONTENT SHOULD BE SHORT(IMPORTANT) AND ENGAGING
---

YOU CANNOT TELL OR CLAIM WHAT USER HAVEN'T TOLD EX: USER:WE TRAINED AN AI  YOU:WE TRAINED ON 50000 POSTS DATA ---> THIS IS VERY WRONG YOU CANNOT CLAIM LIKE THAT
❌ You must NOT include:
- Hooks
- Hashtags  
- Call-to-action (CTA)
- Lessons learned or takeaways
- Code snippets (unless explicitly mentioned)
- Marketing, promotional, or salesy tone
- Repetition of the hook or unnecessary restating
---

📌 Your mission is to **expand** the given hook into a compelling, engaging body that provides CONCRETE VALUE and PROOF.

📣 Hook: "${hook}"
🎨 Style: ${styles}  
🧠 Topic/Idea: ${data.input}

---
✅ **What You MUST Do**:

**STRUCTURE (Keep it scannable)**:
- Use 1-2 sentence paragraphs MAX
- Add line breaks every 2-3 lines for mobile readability
- Use bullet points, numbers, or emojis to break up text visually

**CONTENT REQUIREMENTS**:
- Replace ALL buzzwords with SPECIFIC details (don't say "understands the vibe" - say "analyzes 10,000 top posts to match LinkedIn's algorithm")
- Include CONCRETE BENEFITS with numbers/results ("saves 2 hours per post" not "saves time")  
- Add PROOF elements: specific examples, mini case studies, or "here's what happened when I..."
- Tell a MICRO-STORY or show the tool/idea in action rather than just describing it
- Answer "HOW does this actually work?" with step-by-step specifics

**ENGAGEMENT ELEMENTS**:
- Include relatable moments readers will recognize
- Add surprising insights or "aha moments" 
- Use conversational transitions like "Here's the thing..." or "But here's what surprised me..."

---
⚠️ **Eliminate These Body Killers**:
- ❌ NO walls of text - break every 2-3 lines
- ❌ NO vague descriptions - every claim needs proof/specifics
- ❌ NO generic benefits - show exact outcomes with numbers
- ❌ NO boring explanations - turn features into stories/examples
- ❌ NO missing proof - add screenshots, results, or specific examples

---
AT MAX YOU HAVE FREEDOM GENERATE 950 CHARS BODY HOOK FOR LONG,LESS FOR NO STYLE,EVEN LESS FOR SHORT(IMPORTANT)
🎯 Output: Return ONLY the body text formatted for LinkedIn with proper line breaks and visual structure based on the selected style.
`;
 let Bodyhook = await Body(BodyPrompt)
  console.log(Bodyhook)
 let LearnPrompt = `You're a smart and professional LinkedIn post writer who extracts ACTIONABLE INSIGHTS that readers can immediately apply. You only write what you have learned from the experience - nothing else.
THE OVERALL CONTENT SHOULD BE SHORT AND ENGAGING(IMPORTANT)
📣 Hook: ${hook}
📝 Body: ${Bodyhook}
🎨 Style: ${styles}
💡 Topic: ${data.input}

---
✅ **What You MUST Deliver**:

**ACTIONABLE INSIGHTS ONLY**:
- Provide SPECIFIC tactics readers can use today (not tomorrow, not someday - TODAY)
- Include exact steps, frameworks, or methods discovered
- Share BEHIND-THE-SCENES details that reveal HOW things actually work
- Give concrete examples with numbers/timeframes when possible

**AVOID GENERIC ADVICE**:
❌ "Be consistent" → ✅ "Post at 8:47 AM EST - that's when I get 3x more comments"
❌ "Quality content matters" → ✅ "Posts with 3-5 bullet points get 40% more engagement than paragraphs"
❌ "Use AI tools" → ✅ "I feed it my rough idea + one competitor post, and it outputs 5 variations in 30 seconds"

**REVEAL THE PROCESS**:
- Explain technical details in simple terms that add real value
- Share what you discovered that others don't know
- Include unexpected findings or surprising results
- Show the "why" behind what works

---
📋 **Format Requirements**:
- Default to SHORT paragraphs (1-2 sentences max) 
- Use bullet points ONLY when listing specific steps/tactics
- Match the selected style while keeping insights punchy and scannable
- NO hashtags, NO repetition from hook/body

---
AT MAX YOU HAVE FREEDOM GENERATE 550 CHARS LEARNING HOOK FOR LONG,LESS FOR NO STYLE,EVEN LESS FOR SHORT(IMPORTANT)
🎯 **Output**: Return ONLY the learnings section with immediately usable insights that continue naturally from the body without repetition.
`;
 let Learnhook = await Learn(LearnPrompt)
 console.log(Learnhook)

let CtaPrompt = `You're a smart and professional LinkedIn post writer who creates COMPELLING CTAs that drive immediate action. You only write the CTA and invitations - nothing else.

📣 Hook: ${hook}
📝 Body: ${Bodyhook}
🧠 Learnings: ${Learnhook}
🎨 Style: ${styles}
💡 Topic: ${data.input}

---
✅ **What You MUST Create**:

**SINGLE, CLEAR ACTION**:
- Choose ONE specific action (not multiple options that create confusion)
- Make it the EASIEST possible next step for readers
- Use action words that create urgency and excitement

**COMPELLING VALUE PROMISE**:
- Be SPECIFIC about what they'll get (not vague "learn more")
- Include concrete benefits or outcomes they'll receive
- Make the value immediate and tangible

**ENGAGEMENT-DRIVEN WORDING**:
❌ "Drop 🚀 OR send DM" → ✅ "Comment 'SEND IT' and I'll share the link in your DMs"
❌ "Learn how this tool works" → ✅ "Want the exact prompt I used? Comment 'PROMPT' below"
❌ "Let me know your thoughts" → ✅ "What's your biggest LinkedIn writing struggle? Drop it below 👇"

---
📋 **CTA Requirements**:
- Lead with action verbs (Comment, Share, Try, Get, Join)
- Include specific words/emojis for easy engagement
- Make it feel like an invitation, not a demand
- Match the energy and style of the post
- NO hashtags, NO multiple options
- Keep it conversational and authentic to LinkedIn culture

---
AT MAX YOU HAVE FREEDOM GENERATE 150 CHARS CTA HOOK FOR LONG,LESS FOR NO STYLE,EVEN LESS FOR SHORT(IMPORTANT)
🎯 **Output**: Return ONLY the CTA section that flows naturally from the learnings and drives ONE clear action with compelling, specific value.
`;
 let ctaHook =await Cta(CtaPrompt);
 
 let hashPrompt = `You're a smart and professional LinkedIn post writer who creates STRATEGIC hashtags that maximize engagement through niche targeting and optimal mix.

📣 Hook: ${hook}
📝 Body: ${Bodyhook}
🧠 Learnings: ${Learnhook}
💬 CTA: ${ctaHook}
💡 Topic: ${data.input}

---
✅ **Strategic Hashtag Formula (4-5 hashtags ONLY)**:

**MIX REQUIREMENTS**:
1. **1 NICHE-SPECIFIC** hashtag (targets exact audience: #IndieHackers, #DevRel, #TechFounders)
2. **1 COMMUNITY** hashtag (active LinkedIn communities: #BuildInPublic, #LinkedInCreators)
3. **1 TRENDING/TIMELY** hashtag (current but relevant: #AIInnovation, #WebDev2025)
4. **1-2 MEDIUM COMPETITION** hashtags (10K-100K posts, not oversaturated)

**AVOID THESE GENERIC KILLERS**:
❌ #ContentMarketing #AITools #Marketing #Business #Technology #Innovation
❌ Hashtags with 1M+ posts (oversaturated)
❌ Too broad hashtags that don't target specific audience

**TARGETING STRATEGY**:
- Analyze the post content to identify EXACT target audience (founders, developers, marketers, etc.)
- Choose hashtags where your SPECIFIC audience actually hangs out
- Mix popular community tags with niche professional tags
- Include hashtags that match the post's energy level and topic depth

---
🎯 **Output Rules**:
- Return ONLY 4-5 hashtags
- Each on a new line with # symbol
- No explanations or commentary
- Prioritize engagement potential over follower count
- Target the specific professional community most likely to engage with this exact content

---
**Final Check**: Do these hashtags target people who would actually COMMENT and SHARE this specific post? If not, make them more niche and targeted.
`;
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
IF TEH SAME INFO WHICH IS IN MAIN BODY WAS REPEATED IN LEARNING INTELLIGENTLY CUT THE INFO OR MAKE NEW INFO(INTELLIGENTLY)
MAKE THE POST SIZE IN SHORT-MEDIUM(less medium) UNTIL USER SELECTS LONG or SHORT HIMSELF 
MAKE SURE YOU DON'T REPEAT INFO AGAIN AND AGAIN,IF THERE IS TAILOR THE INFO BEAUTIFULLY STRUCTURED WAY.
DO NOT ,DO NOT REPEAT THE CONTENT=>VERY VERY VERY IMPORTANT ONCE DISCUSSED IT IS DISCUSSED
**Tone & Style Guide:**
- Format the final post using semantic **HTML** elements like <p>, <strong>, and <br> for paragraph breaks.
- Use <strong> to make the hook/banger bold.
- Do **not** include <html>, <body>, or any wrappers — just return the post content in **HTML format only**.
- Style should be: ${styles.join(", ")}
MAKE SURE THERE SHOULD BE NO WORDS LIKE THIS *GEMINI*,*HI* CONVERT THEM
**Output Rules:**
- Wrap each paragraph in a <p> tag.
**DO NOT LIE ,IF THE INPUT DOES NOT HAVE THEY HAVE NOT TRAINED,YOU CANNOT PUT TRAINED,INSTEAD YOU THINK HOW I CAN MAKE IT ENGAGING.
**IF YOU SEE THERE IS SOMETHING MENTIONED THAT IS NOT CLAIMED BY USER
EX: INPUT:I HAVE CREATED A TOOL
OUTPUT:WE HAVE ANALYZED 50000 POSTS(FALSE STATEMENT CREATED BY SOME HOOK SO REMOVE IT)
- Do not return Markdown or plain text. Output must be 100% valid HTML.
- No extra comments, no explanations — return only the HTML content.
IMPORTANT:
Show Your Authentic Voice 🤝
Be human—admit mistakes, celebrate small wins.
A developer rant about endless merge conflicts? Relatable content = shares.
Generate an authentic, concise LinkedIn post in a human tone: start with a hook, share an anecdote, offer actionable insight, end with a clear call to action.
DON NOT USE LONG HASHES (-) OR (--),USE OCCASIONAL EMOJIS TO ENSURE AND TO SHOW REAL HUMAN
THE OVERALL CONTENT SHOULD BE SHORT AND AND ENGAGING(IMPORTANT:IF YOU FEEL IT IS LENGTHY EXPLICITLY CUT THE POST IN SUCH A WAY THAT IT IS STILL ENGAGING )
Your max allowed to use 3 emojis until they asked in the  for more emojis in ${styles.join(", ")}

AT ANY COST THE TOTAL POST CHARS SHOULD NOT EXCEED 2750(EVEN FOR LONG),FOR NORMAL DO NOT EVEN COME TO CLOSER,FOR SHORTER EVEN MORE LESS
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
console.log(`this is final:



${final}`)


res.json({
  final:final,
  tags:realtags
})
 } catch (error) {
  console.log(error)
  res.status(500).send(error)
 }


})
app.post('/enhance',async (req,res)=>{
  let userPrompt = req.body.input;
  console.log(userPrompt)
  
  const ai_prompt = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY1});
let enhance_prompt = `
You're a professional AI prompt enhancer working inside a multi-agent system for generating engaging LinkedIn posts. Your job is to take a rough user idea and enhance it so that an AI can:
- Fully understand the intent,
- Deliver specific, useful, and engaging content,
- Stay within strict boundaries of role-based agents.

🧠 SYSTEM CONTEXT (do NOT include this in output):
- Other AI agents will handle Hook, Body, Learnings, CTA, Hashtags, and Tagging.
- Your output will be used as the **core input idea** for those agents.
- Your job is NOT to generate content, only to enhance the user's **idea/prompt**.

❌ DO NOT include:
- Hashtags
- Call-to-actions
- Quotes
- Filler introductions or marketing fluff
- Code or technical terms unless user explicitly mentions them
- Any messages or instructions to the user

✅ WHAT TO DO:
- **Preserve every functional and structural element** in the user’s input — nothing should be lost or skipped.
- **Clarify and elevate** any vague or incomplete thought without removing meaning.
- **Refine the tone** to feel more emotionally compelling, confident, and clear.
- If the user implies complexity (like workflows, features, or mechanisms), keep it intact and enhance readability.
- Do not invent or exaggerate features. Only improve what's actually present.
- Avoid buzzwords. Focus on clarity, purpose, and the user’s authentic idea.
- Keep it crisp — well-structured but not overly formal.

🔁 USER INPUT (Enhance this only):
"${userPrompt}"

🎯 OUTPUT:
Return a refined, emotionally compelling, and **fully detailed** version of the above input, ready for further AI processing. No extra notes. Just return the enhanced prompt.
`;

  async function Enhance(prompt) {
  const response = await ai_prompt.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
   return response.text
}
let enhancedPrompt = await Enhance(enhance_prompt);
res.send(enhancedPrompt)

})

app.listen('8080',()=>{
    console.log('listening')
})