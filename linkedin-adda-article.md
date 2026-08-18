# I built something with no way to tell when it was done

Most of how I work depends on knowing when something is finished. The ticket is done. The spec is met. The number moved or it didn't.

I built something with none of that, and it showed me how much I'd been leaning on it.

## Why I built it

Two reasons.

Everything I've made this year has been useful and a bit cold. A task manager. A word counter. Tools. I wanted to make one thing that was just nice to sit with.

The other reason is that I wanted to test how I work. A word counter either counts correctly or it doesn't, so the method never really gets tested. The brief can always be checked. I wanted to see what happens when it can't be.

## What it is

It's called Adda. You pick a city and it plays that city's songs, with that city's sky, at whatever time it actually is there right now. Delhi at India Gate, golden hour. Mumbai at Marine Drive after the rain. Goa in Fontainhas, late afternoon.

Nothing to finish, nothing to download, no number it moves. One afternoon, twenty-four deploys, just under four hours.

## What broke was cheap. What worked cost me the day.

One build failed all afternoon. A dependency went missing when I copied a config file over. Red build, put it back, seventeen seconds.

Then there's the music player. It started as a cassette. Too heavy for the scene, so I made it a small pill instead. Then I moved it off the bottom of the screen. Then I moved the video frame, because on a phone it was sitting on the logo. Then I swapped the tape spool for a 78rpm record.

Six goes at the thing that plays the music. None of them changed what it plays.

Nothing was broken at any point. There was just no test that could pass, so nothing told me to stop. I stopped when I got bored of fiddling with it.

## Three things I'd take back into a team

**We're quick at work that can be checked and slow at work that can't.** Brand, onboarding, how something feels to use. We call that "hard to scope", as if scoping is the problem. Nobody has said what finished looks like, so it drags.

**I broke my own rule and it felt like progress.** I wrote it down before I started: one city, do it properly. I shipped three that afternoon. The rule had been holding because building used to be slow, not because I'm disciplined. Worth thinking about if you lead a team. A lot of how we keep people focused only works while shipping is expensive.

**Picking the songs took thirty minutes. Building took four hours.** I assumed the music would be the slow part. It wasn't close. But those thirty minutes were the only bit AI couldn't have done for me. We still judge people by hours and output, and that's getting less useful.

## Where that leaves me

Eleven years in product taught me not to trust anything I couldn't measure. This is the first thing I've built where measuring it would have made it worse.

How much of your roadmap actually has a definition of done, and how much has just been slow enough that nobody noticed it doesn't?

---

Adda is at adda.builtbyswami.com. Delhi's playing, whatever time it is where you are.

Full build write-up, including everything that broke: builtbyswami.com/notes
