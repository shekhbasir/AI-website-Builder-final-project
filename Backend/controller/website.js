//now i am here going to making the website that help very

import { generateResponse } from "../config/openRouter.js";
import UserDatabase from "../model/user.js";
import website from "../model/website.js";
import Extractjson from "../utils/extract.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const GenerateData = async (req, res) => {
  try {
    //thiere i am going to tecking the promp t
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "prompt required for generating Any thing" });
    }

    const user = await UserDatabase.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "plz login for response generation" });
    }

    if (user.credit < 50) {
      return res
        .status(400)
        .json({ message: "You Don't Have Enough Credit For Generate Website" });
    }
    //here i am putin my prompt with master prommpt
    const finalprompt = masterPrompt.replace("{USER_PROMPT}", prompt);
    let row = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      row = await generateResponse(finalprompt);
      parsed = await Extractjson(row);
      if (!parsed) {
        row = await generateResponse(
          finalprompt + "\n\n RETURN ONLY ROW JSON.",
        );
        parsed = await Extractjson(row);
      }
      console.log(row);
    }

    if (!parsed.code) {
      console.log("Ai return invalid response ", row);
      return res.status(400).json({ message: "Ai return invalid data " });
    }

    const finalwebsite = await website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestcode: parsed.code,
      slug: nanoid(10),
      converasation: [
        {
          role: "ai",
          content: parsed.message,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    user.credit = user.credit - 50;
    await user.save();

    return res.status(201).json({
      websiteId: finalwebsite._id,
      remainingCredit: user.credit,
    });

    //now here i am going to wrting thhe code for the new prompt
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error from the Generate data", kabhail: error });
  }
};
