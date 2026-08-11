For eleven years I built products that had to justify themselves. Roadmaps, business cases, a number at the end of every deck. This year I've been running the opposite experiment — no team, no runway, one operator, one sitting — but the test cases were still utilities. A [task manager](https://www.builtbyswami.com/notes/24-hour-task-manager-sprint). A [word counter](https://www.builtbyswami.com/notes/freewordtool-one-day-sprint). Small, but each one had a job, which meant each one had a way to be right or wrong.

[Adda](https://adda.builtbyswami.com) has no job. You pick a city, and it plays that city's songs under that city's sky, on that city's clock — whatever time it happens to be there right now. Delhi first: 31 tracks at India Gate, golden hour. That's the whole product. Nothing to complete, nothing to export, no number it moves.

It shipped on [[ship date]], [[commit count / duration]], on [[stack]].

It was the hardest brief I've written, and the speed had nothing to do with it.

## Why build something with no job

The AI-native method I keep testing has a load-bearing assumption I hadn't noticed: it runs on a definition of done. Write the context, state the constraints, say what's out of scope, then let Claude execute against it fast. That works because a word counter either counts words correctly or it doesn't. The brief can be checked.

Adda can't be checked. "Does this feel like Delhi at golden hour" isn't a test. There's no acceptance criterion, no user story, no way to open a PR and know. So I wanted to see what the method does when you take the scoreboard away — because if it only works where success is measurable, it isn't a way of building, it's a way of building CRUD.

There's a second reason, less methodological. Everything I've shipped this year has been useful and slightly cold. I wanted to make one thing that was only warm.

## The method

**Write the context before the code — but the context is now a feeling.** The brief for Free Word Tool was six jobs-to-be-done. The brief for Adda was closer to a mood board in prose: the specific quality of light at India Gate around 6pm, why the clock has to show Delhi's time and not yours, why the copy is in Devanagari first. None of it is executable. All of it turned out to be necessary, because it was the only thing standing between me and a generic music player.

**The model builds the container, not the contents.** Claude built the player, the city routing, the timezone logic, the whole shell — quickly, and well. It could not tell me which 31 songs belong at India Gate at golden hour, and it never pretended it could. That selection took [[how long track selection took]], and it is the actual product. The code is packaging.

**Constrain by subtraction.** Bambai and Lucknow are on the site marked "soon," and they're marked soon on purpose. One city with 31 right tracks says something. Three cities with 90 approximately-right tracks says nothing, and I'd have had the second version running inside a day. Cheap generation makes breadth almost free, which is exactly why breadth stopped being a decision and had to become a rule.

**Ship the smallest complete feeling.** Not an MVP in the usual sense — an MVP implies a fuller version is coming. Delhi at golden hour is already whole. The next city is a new whole thing, not a completion of this one.

## What actually broke

[[what actually broke — the honest section. The other posts are strong here because they admit something real: the task manager post admits LLM context was the bottleneck, the word counter post admits I nearly shipped five products by accident. What went wrong on Adda? Candidates: track licensing/sourcing, the timezone logic across DST, the Devanagari type rendering, the audio autoplay policies on mobile Safari, or the thing where you couldn't tell if it was good because you'd listened to it 200 times.]]

The failure mode I did see coming, and still walked into partway: I kept reaching for features to prove the thing was real. A share button. A track list. Stats. Every one of them was a way of making an unmeasurable product measurable, which is to say a way of turning it back into a utility because utilities are comfortable. Most of them came out. The ones that stayed are there because they serve the feeling, not because they serve me.

## Steal this

- **The method needs a definition of done, and you may have to supply it by hand.** With a utility, "done" is inherited from the problem. With anything expressive, you have to decide what done means before you start, or you will keep building forever in search of the feeling that you're finished.
- **AI collapses the cost of the container, not the contents.** Whatever in your product can't be generated — taste, curation, a point of view — is now the entire job. That's not a consolation prize. That's where the product actually lives.
- **Breadth has to become a rule when it stops being expensive.** "One city, done properly" was a constraint I had to write down and defend. Left implicit, it would have lasted about four hours.
- **Build one thing a year that doesn't have to justify itself.** Not as a break from the real work. As a check on whether your method survives contact with a problem that has no scoreboard — because that's most of the interesting problems.

Eleven years of product management taught me to be suspicious of anything I couldn't measure. Adda is the first thing I've built where the measurement would have made it worse.

**Go listen: [adda.builtbyswami.com](https://adda.builtbyswami.com).** Delhi's playing, whatever time it is where you are.
