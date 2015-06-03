//Viento CSS animation library by Austin Jackson

function Viento() {
    //
}

Viento.prototype.callInteration = 0;

Viento.prototype.fire = function(t) {
    console.log("call iteration: "+Viento.prototype.callInteration);
    Viento.prototype.callInteration++;
    //If these are undefined, set a default value to stop errors
    if(t.animation.beforeDelay === undefined) {
        t.animation.beforeDelay = 0;
    }
    if(t.animation.afterDelay === undefined) {
        t.animation.afterDelay = 0;
    }
    if(t.animation.resetAfter === undefined) {
        t.animation.resetAfter = true;
    }

    if(t.callback === undefined) {
        t.callback = function() {};
    }
    if(t.withAnimation === undefined){
        t.withAnimation = function() {};
    }

    //If this is an entrance animation, wait for the animation to start to reveal the element
    if(t.animation.type === "entrance") {
        if(t.element.getAttribute("data-v-hasAnimationStartListener") === "true"){
            console.log("Element with id "+t.element.getAttribute("id")+" already has an animationStart listener.");
        }
        else {
            t.element.setAttribute("data-v-hasAnimationStartListener","true");
            t.element.addEventListener("animationstart",function(){
                t.element.style.visibility = "visible";
            });
        }
    }

    //Timeout function for an optional beforeDelay time
    setTimeout(function(){
        //Set the given animation properties, thus running the CSS animation
        //t.withAnimation();
        //Standard
        t.element.style.animationName = t.animation.name;
        t.element.style.animationDuration = t.animation.duration;
        t.element.style.animationDelay = t.animation.delay;
        t.element.style.animationDirection = t.animation.direction;
        t.element.style.animationFillMode = t.animation.fillMode;
        t.element.style.animationIterationCount = t.animation.iterationCount;
        t.element.style.animationPlayState = t.animation.playState;
        t.element.style.animationTimingFunctions = t.animation.timingFunctions;
        //-webkit-
        t.element.style.webkitAnimationName = t.animation.name;
        t.element.style.webkitAnimationDuration = t.animation.duration;
        t.element.style.webkitAnimationDelay = t.animation.delay;
        t.element.style.webkitAnimationDirection = t.animation.direction;
        t.element.style.webkitAnimationFillMode = t.animation.fillMode;
        t.element.style.webkitAnimationIterationCount = t.animation.iterationCount;
        t.element.style.webkitAnimationPlayState = t.animation.playState;
        t.element.style.webkitAnimationTimingFunctions = t.animation.timingFunctions;
        //Style.animation will overwrite everything before it, so we only want to set it if it has data. This is to keep us from setting everything to undefined or default values.
        if(t.animation.animation !== undefined) {
            t.element.style.animation = t.animation.animation;
        }

        //Wait for the animation to end
        if(t.element.getAttribute("data-v-hasAnimationEndListener") === "true"){
            console.log("Element with id "+t.element.getAttribute("id")+" already has an animationEnd listener.");
        }
        else {
            t.element.setAttribute("data-v-hasAnimationEndListener","true");
            t.element.addEventListener("animationend",function(){
                //Timeout function for an optional afterDelay time
                setTimeout(function(){

                    //If this is an exit animation, hide the element
                    if(t.animation.type === "exit") {
                        t.element.style.visibility = "hidden";
                    }
                    //If resetAfter is enabled, reset the CSS animation properties and involved classes
                    if(t.animation.resetAfter === true){
                        //If this element has an entrance animation, remove the "hidden" class from it and reset the visibility to default
                        if(t.animation.type === "entrance") {
                            $(t.element).removeClass("hidden");
                            t.element.style.visibility= "";
                        }
                        
                        //Standard
                        t.element.style.animationName = "";
                        t.element.style.animationDuration = "";
                        t.element.style.animationDelay = "";
                        t.element.style.animationDirection = "";
                        t.element.style.animationFillMode = "";
                        t.element.style.animationIterationCount = "";
                        t.element.style.animationPlayState = "";
                        t.element.style.animationTimingFunctions = "";
                        t.element.style.animation = "";
                        //-webkit-
                        t.element.style.webkitAnimationName = "";
                        t.element.style.webkitAnimationDuration = "";
                        t.element.style.webkitAnimationDelay = "";
                        t.element.style.webkitAnimationDirection = "";
                        t.element.style.webkitAnimationFillMode = "";
                        t.element.style.webkitAnimationIterationCount = "";
                        t.element.style.webkitAnimationPlayState = "";
                        t.element.style.webkitAnimationTimingFunctions = "";
                    }
                    //Everything is done, run the callback function
                    t.callback();

                },t.animation.afterDelay);
            });
        }

    },t.animation.beforeDelay);
    
}
