## Steps

1. Managed to get straight lines in between points
2. Got curved lines in between them
3. Time to make them dinamic
	![[Screenshot 2021-12-18 at 19.51.52.png]]
	Fail, because it is only taking into account the complete axels, I'm goint to split them in radii
4. Spiderweb between radii!
5. Let's make radii dynamic (this will allow for variance)
6. Parametrizing stuff to add randomness

Great thanks to George Francis for [his amazing post](https://georgefrancis.dev/writing/a-generative-svg-starter-kit/), willing to try what he explains is what sparked the interest for this project. 

## Things I could have pushed further

- Displace anchor points a bit up / down to add variety to the web.
- Try to animate the step by step drawing of the web. Maybe using [requestAnimationFrame](https://css-tricks.com/using-requestanimationframe)?

## How I worked on this

It all started with an index.html with all the code there. By using the new modules spec, I could even use imports natively when things grew to big! No preprocessors, no babel, nothing!! 

I used the [live-reload](https://www.npmjs.com/package/live-server) NPM package to start a live reloading server and that's it. Code changes on the left of the screen, sketchs updates instantly on the right. This has been one of the most easy to work in environments I have tried, completely gets out of the way and let's the creative juices flow.

## Learnt

- How to create a FAST generative playing sandbox
- How Spider webs are constructed
- How paths work
- How to obtain the midpoint between two points
- How to create a new point offset an specific amount in the bisecting angle between two points

Resources: 
https://georgefrancis.dev/writing/a-generative-svg-starter-kit/
https://stackoverflow.com/questions/32921322/svg-marker-can-i-set-length-and-angle
https://stackoverflow.com/questions/49274176/how-to-create-a-curved-svg-path-between-two-points
https://www.youtube.com/watch?v=gSwvH6YhqIM