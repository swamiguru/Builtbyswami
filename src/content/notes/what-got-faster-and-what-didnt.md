For eleven years my job was to decide what got built and then wait. A roadmap item became a spec, the spec became a sprint, and something shipped a quarter later. Most of the risk lived in the waiting. You found out whether an idea was any good long after the moment you had it.

That gap has mostly closed. At Condé Nast, putting AI through the product cycle cut our prototyping time by about 30% and time-to-market by half. Working alone this year it's been sharper than that. A task engine from empty repo to working app in 24 hours. A word counter in a day, eight commits. Adda, which plays a city's songs under that city's sky, in twenty-four deploys across four hours.

I expected that to be the whole story. Build fast, learn fast, and the old bottleneck disappears. It isn't the whole story, and the part I got wrong is more useful than the part I got right.

## What actually got faster

Producing code got faster. Almost nothing else did.

The work I do now looks like this: write down what the thing is, what it isn't, and what the edges are. Hand that to a model. Review what comes back, correct it, go again. The generation step is close to free. Every step around it costs exactly what it always did.

Deciding what's worth building didn't get faster. Knowing when a thing is finished didn't get faster. And the quality of what comes out tracks the quality of the brief almost exactly, which means the thinking moved earlier rather than disappearing. I used to write specs so engineers knew what to build. I write them now so I know what I'm asking for, and they have to be better than the ones I used to write, not worse.

## Where it went wrong

Free Word Tool was meant to be one utility. I'd scoped six user segments, and by mid-build it was turning into five separate products, each of which looked cheap to add because generating them was cheap. I caught it and cut back to one. That's the version that shipped.

Adda I didn't catch. I had written the constraint down explicitly: one city, done properly. Delhi, 31 tracks, everything else marked as coming soon. Within the same sitting I shipped Mumbai and Goa as well, because by then the shape existed and another city cost almost nothing. I broke my own written rule before dinner, and the entire time it felt like momentum rather than drift.

Then there was the player. Six commits on the object that plays the music, over an afternoon. A cassette slab became a pill, the pill moved off the bottom edge, the video frame moved twice, the spool became a record with a rangoli rosette. Not one of those changes affected which songs play or how well they play. The only build that failed loudly all day was a missing dependency, which took seventeen seconds to spot and one commit to fix.

That's the pattern. The loud failures are cheap now. The expensive ones are silent, and they're all decisions.

## What I'd do differently

- Write the definition of done before the brief, not after. The method works because there's something to check against. On a utility that's obvious. On anything expressive I had no test that could go green, so I kept rearranging until I got bored, and boredom is not a completion signal.
- Make breaking a constraint cost something. Writing "one city" down did nothing. What would have worked is deciding in advance that a second city meant stopping for a day first.
- Budget worry by silence, not by drama. I spent no time worrying about build errors and should have spent none. I spent an afternoon on a UI element that was never wrong, only unfinished.
- Treat the brief as the deliverable. It's the one input with no substitute, and it's now the only place where being good at this shows up.

## The part I'm still unsure about

Cheap generation removes the friction that used to protect me from myself. Scope creep used to be expensive enough that it announced itself. A quarter of engineering time is a conversation. An extra city in an afternoon isn't. I don't yet have a good replacement for that friction beyond noticing it afterwards and writing it down, which is what this is.

If you've started building this way: what's the last thing you shipped that you'd have talked yourself out of when it was expensive?
