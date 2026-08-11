For eleven years I built products that had to justify themselves. Roadmaps, business cases, a number at the end of every deck. This year I've been running the opposite experiment — no team, no runway, one operator, one sitting — but the test cases were still utilities. A [task manager](https://www.builtbyswami.com/notes/24-hour-task-manager-sprint). A [word counter](https://www.builtbyswami.com/notes/freewordtool-one-day-sprint). Small, but each one had a job, which meant each one had a way to be right or wrong.

[Adda](https://adda.builtbyswami.com) has no job. You pick a city, and it plays that city's songs under that city's sky, on that city's clock — whatever time it happens to be there right now. Delhi at India Gate, golden hour. Mumbai, Marine Drive after the rain. Goa, Fontainhas, late afternoon. That's the whole product. Nothing to complete, nothing to export, no number it moves.

It shipped on August 11, 2026 — twenty-four deploys in just under four hours, from empty repo to live on [adda.builtbyswami.com](https://adda.builtbyswami.com). Next.js 16 on the App Router, Turbopack, Redis for live presence, YouTube doing the actual playback, Anek carrying the Devanagari. Deployed on Vercel. One red build the whole afternoon.

It was the hardest brief I've written, and the speed had nothing to do with it.

## Why build something with no job

The AI-native method I keep testing has a load-bearing assumption I hadn't noticed: it runs on a definition of done. Write the context, state the constraints, say what's out of scope, then let the model execute against it fast. That works because a word counter either counts words correctly or it doesn't. The brief can be checked.

Adda can't be checked. "Does this feel like Delhi at golden hour" isn't a test. There's no acceptance criterion, no user story, no way to open a PR and know. So I wanted to see what the method does when you take the scoreboard away — because if it only works where success is measurable, it isn't a way of building, it's a way of building CRUD.

There's a second reason, less methodological. Everything I've shipped this year has been useful and slightly cold. I wanted to make one thing that was only warm.

## The method

**Write the context before the code — but the context is now a feeling.** The brief for Free Word Tool was six jobs-to-be-done. The brief for Adda was closer to a mood board in prose: the quality of light at India Gate around six, why the clock has to show Delhi's time and not yours, why the wordmark is अड्डा and not "Adda." None of it is executable. All of it was necessary, because it was the only thing standing between me and a generic music player.

**The thing you can't delegate isn't always the thing that takes longest.** Picking Delhi's 31 tracks took thirty minutes. The build took just under four hours. I'd assumed going in that curation would be the bottleneck — it wasn't, and that's the more useful finding. Thirty minutes of taste was the only input the model couldn't have produced, and it was a rounding error on the clock. Leverage isn't about where your hours go.

**Everything downstream of a feeling is still just engineering.** Timezone maths, a presence counter, a crossfade, blur-up artwork, Media Session so the lock screen shows the right thing. The model handled all of it well and fast. The feeling sets the spec; the spec is then perfectly ordinary work.

## What actually broke

The only red build of the day was the dullest possible failure. I moved the presence counter off Upstash's REST client onto Vercel's Redis, pushed, and it went straight to ERROR — the `redis` dependency had been lost in a bad `package.json` copy. Seventeen seconds of red, one commit to fix, no thinking required. When something can break loudly, it breaks fast and cheap. That's the good case.

What actually cost me the afternoon was the part that couldn't fail loudly: the player.

It started as a cassette slab. Then it became a compact single-reel pill, because the slab was too heavy for the scene. Then I lifted the pill off the bottom edge, and tucked the YouTube frame into the corner. Then, on phones, I moved the frame above the pill because it was fighting the wordmark. Then I swapped the tape spool for a 78rpm record with a rangoli rosette on the label. Six commits on the object that plays the music. Not one of them changed which music it plays, or how well it plays it.

The same pattern everywhere I look in the history. Connaught Place swapped out for India Gate. A `.soon` class colliding between the card status and the badge. Auto-pulled track metadata wrong often enough that I ended up hand-writing an overrides file. Lucknow built, shipped, then hidden again because it didn't have artwork good enough to sit next to the others.

None of that is failure exactly. It's what iteration looks like when there's no test that can go green. With a utility, "done" arrives and tells you. Here I just kept moving the furniture, and the only signal that I was finished was getting bored of moving it — which is not a signal, it's a mood.

And then the discipline broke outright. I had told myself: one city, done properly. Delhi, 31 tracks, everything else marked "soon." Within the same sitting I shipped Mumbai with 13 tracks and Goa with 23, because by then the room-shaped hole was carved and adding a city cost almost nothing. The constraint I'd written down explicitly is the one I'd broken before dinner. Cheap generation doesn't just accelerate the work — it accelerates you straight past your own rules, and it feels like momentum the entire time.

## Steal this

- **Loud failures are the cheap ones.** The build error cost me seventeen seconds. The player chrome cost me most of the afternoon and never once turned red. Budget your worry accordingly.
- **Without a test that goes green, "done" is a mood.** Decide in advance what finished looks like for anything expressive, or you'll keep rearranging until you're tired and call that completion.
- **The thing only you can do may be small.** Thirty minutes of track selection against four hours of build. That doesn't make the taste less essential — it was the one input with no substitute — but it does mean you should stop measuring your contribution in hours.
- **Write the constraint down, then watch yourself break it anyway.** I documented "one city" and shipped three. Writing it down wasn't enough. What would have worked is making the second city expensive on purpose.

Eleven years of product management taught me to be suspicious of anything I couldn't measure. Adda is the first thing I've built where the measurement would have made it worse — and the first where I couldn't tell, from the inside, when to stop.

**Go listen: [adda.builtbyswami.com](https://adda.builtbyswami.com).** Delhi's playing, whatever time it is where you are.
