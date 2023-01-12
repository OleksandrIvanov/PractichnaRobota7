var audioCtx = window.AudioContext || window.webkitAudioContext;

var canvas;
var audioContext, canvasContext;
var analyser;
var width, height;

var dataArray, bufferLength;

	
		
		
            var canvas = document.querySelector("#myCanvas");
            var ctx = canvas.getContext("2d");
            var width = canvas.width, height = canvas.height;
            var lastX = width * Math.random();
            var lastY = height * Math.random();
            var hue = 0;

            // Michel Buffa : set the target framerate TRY TO CHANGE THIS VALUE AND SEE
            // THE RESULT. Try 2 frames/s, 10 frames/s, 60 frames/s Normally there
            // should be a limit at 60 frames/s in the browser's implementations.
            setFrameRateInFramesPerSecond(10);


            // for time based animation. DelayInMS corresponds to the target framerate
            var now, delta, delayInMS, totalTimeSinceLastRedraw = 0;

            // High resolution timer
            var then = performance.now();

            // start the animation
            requestAnimationFrame(mainloop);

            function setFrameRateInFramesPerSecond(frameRate) {
                delayInMs = 1000 / frameRate;
            }

            // each function that is going to be run as an animation should end by
            // asking again for a new frame of animation
            function mainloop(time) {
                // Here we will redraw something only if the time we want between frames has
                // been elapsed
                // Measure time, with high resolution timer
                now = time;

                // How long between the current frame and the previous one ?
                delta = now - then;
                // TRY TO UNCOMMENT THIS LINE AND LOOK AT THE CONSOLE
                //console.log("delay = " + delayInMs + " delta = " + delta + " total time = " + totalTimeSinceLastRedraw);   

                // If the total time since the last redraw is > delay corresponding to the wanted
                // framerate, then redraw, else add the delta time between the last call to line() by requestAnimFrame
                // to the total time..
                if (totalTimeSinceLastRedraw > delayInMs) {
                    // if the time between the last frame and now is > delay then we
                    // clear the canvas and redraw

                    ctx.save();

                    // Trick to make a blur effect: instead of clearing the canvas
                    // we draw a rectangle with a transparent color. Change the 0.1
                    // for smaller value will increase the blur...
                    ctx.fillStyle = "rgba(22, 95, 120,0.1)";
                    ctx.fillRect(0, 0, width, height);

                    ctx.translate(width / 2, height / 2);
                    ctx.scale(0.9, 0.9);
                    ctx.translate(-width / 2, -height / 2);

                    ctx.beginPath();
                    ctx.lineWidth = 5 + Math.random() * 10;
                    ctx.moveTo(lastX, lastY);
                    lastX = width * Math.random();
                    lastY = height * Math.random();

                    ctx.bezierCurveTo(width * Math.random(),
                            height * Math.random(),
                            width * Math.random(),
                            height * Math.random(),
                            lastX, lastY);

                    hue = hue + 10 * Math.random();
                    ctx.strokeStyle = "hsl(" + hue + ", 50%, 50%)";
                    ctx.shadowColor = "white";
                    ctx.shadowBlur = 10;
                    ctx.stroke();

                    ctx.restore();

                    // reset the total time since last redraw
                    totalTimeSinceLastRedraw = 0;
                } else {
                    // sum the total time since last redraw
                    totalTimeSinceLastRedraw += delta;
                }

                // Store time
                then = now;

                // request new frame
                requestAnimationFrame(mainloop);
            }