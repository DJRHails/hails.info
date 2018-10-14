$(document).ready(function() {

    $('.content-23').each(function() {
        if(! isMobile.any())
            $(this).parallax('50%', 0.3, true);
        else
            $(this).css('background-attachment', 'initial');
    });

    $('.btn-next').on('click', function() {
        $.scrollTo($(this).closest('section').next(), {
            axis : 'y',
            duration : 500
        });
        return false;
    });

    var prefix = 'I work with ';
    var skills = [
        'Python',
        'C#',
        'x86 ASM',
        'JavaScript',
        'HTML & CSS',
        'LESS',
        'jQuery',
        'Node.js',
        'SQL',
        'PHP & MySQL'
    ].map(function (s) { return s + "."; });
    var delay = 10;
    var step = 1;
    var tail = 5;
    var timeout = 75;
    var p = document.getElementsByClassName("adapt-text")[0];
    var prefix_e = document.createElement('span');
    prefix_e.className = "m-line";
    var postfix_e = document.createElement('span');
    // postfix_e.className = "m-line";

    var colors = [
      "#c0392b",
        // "rgb(110,64,170)",
        // "rgb(150,61,179)",
        // "rgb(191,60,175)",
        // "rgb(228,65,157)",
        // "rgb(254,75,131)",
        // "rgb(255,94,99)",
        // "rgb(255,120,71)",
        // "rgb(251,150,51)",
        // "rgb(226,183,47)",
        // "rgb(198,214,60)",
        // "rgb(175,240,91)",
        // "rgb(127,246,88)",
        // "rgb(82,246,103)",
        // "rgb(48,239,130)",
        // "rgb(29,223,163)",
        // "rgb(26,199,194)",
        // "rgb(35,171,216)",
        // "rgb(54,140,225)",
        // "rgb(76,110,219)",
        // "rgb(96,84,200)",
    ];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function getRandomChar() {
        return String.fromCharCode(Math.random() * (127 - 33) + 33);
    }
    function getRandomColoredString(n) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < n; i++) {
            var char = document.createElement('span');
            char.textContent = getRandomChar();
            char.style.color = getRandomColor();
            fragment.appendChild(char);
        }

        return fragment;
    }
    /** Global State */
    var state = {
        text: '',
        prefixP: -tail,
        skillI: 0,
        skillP: 0,
        direction: 'forward',
        delay: delay,
        step: step
    };
    function render() {
        var skill = skills[state.skillI];
        if (state.step) {
            state.step--;
        }
        else {
            state.step = step;
            if (state.prefixP < prefix.length) {
                if (state.prefixP >= 0) {
                    state.text += prefix[state.prefixP];
                }
                state.prefixP++;
            }
            else {
                if (state.direction === 'forward') {
                    if (state.skillP < skill.length) {
                        state.text += skill[state.skillP];
                        state.skillP++;
                    }
                    else {
                        if (state.delay) {
                            state.delay--;
                        }
                        else {
                            state.direction = 'backward';
                            state.delay = delay;
                        }
                    }
                }
                else {
                    if (state.skillP > 0) {
                        state.text = state.text.slice(0, -1);
                        state.skillP--;
                    }
                    else {
                        state.skillI = (state.skillI + 1) % skills.length;
                        state.direction = 'forward';
                    }
                }
            }
        }
        prefix_e.textContent = state.text.slice(0,prefix.length)
        postfix_e.textContent = state.text.slice(prefix.length,state.text.length)
        p.textContent = "";
        p.appendChild(prefix_e);
        p.appendChild(postfix_e);
        p.appendChild(getRandomColoredString(state.prefixP < prefix.length ?
            Math.min(tail, tail + state.prefixP) :
            Math.min(tail, skill.length - state.skillP)));
        setTimeout(render, timeout);
    }
    setTimeout(render, 500);
});
