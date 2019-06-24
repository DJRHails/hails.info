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
        'C, C++ & C#',
        'x86 ASM',
        'Kotlin & Java',
        'PHP & MySQL',
        'TypeScript, JavaScript & jQuery',
        'SASS, LESS & CSS',
        'Swift',
        'Flutter',
        'People'
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
        finished: false,
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
                        else if (state.skillI < skills.length - 1) {
                            state.direction = 'backward';
                            state.delay = delay;
                        } else {
                          state.direction = 'finished';
                        }
                    }
                }
                else if (state.direction === 'backward') {
                    if (state.skillP > 0) {
                        state.text = state.text.slice(0, -1);
                        state.skillP--;
                    }
                    else {
                      state.skillI++;
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
