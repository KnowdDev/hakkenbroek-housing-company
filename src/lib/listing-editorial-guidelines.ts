/** Editorial hints for agents syncing Hakkenbroek listings via MCP (tone, structure). */
export const LISTING_EDITORIAL_GUIDELINES = `
## Hakkenbroek listing voice

- Write with calm confidence and discretion. Luxury brokerage, never hype or urgency tricks.
- Prefer precise facts (m², orientation, finishes, tenure where relevant) over superlatives.
- Opening sentence: location + typology + one distinctive trait.
- Body: light → layout → finishes → outdoor → parking → neighbourhood connectivity (schools, transit).
- Avoid ALL CAPS, excessive exclamation marks, and repetitive clichés ("dream home", "must-see").
- English site copy stays British/neutral international English unless the source markdown is Dutch. Then mirror NL faithfully first, improve clarity second.
- Short paragraphs (2 to 4 sentences). Bullet lists only for specs readers scan quickly.

## Surgical updates

- Prefer \`update_listing\` with only changed fields after \`get_listing\` or \`list_listings\`.
- Preserve existing image order unless the markdown clearly defines a new primary + gallery sequence.
- Map Dutch labels: Huur→rent, Koop→sale, Appartement→apartment, etc.
`.trim();
