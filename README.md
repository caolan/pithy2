# Pithy 2

A less painful API for generating raw DOM Elements - inspired by
[pithy](https://github.com/caolan/pithy).

Integrates well with Typescript - checks you're setting acceptable
property values for the given tag etc.

## Usage

``` typescript
import * as html from "pithy2";

// Empty element.
html.div();

// Element with children.
html.a(['click me']);

// Element with custom properties.
html.a({href: '#'});

// Element with custom properties and children.
html.a({href: '#'}, ['click me']);

// Custom tagName or an element not otherwise supported by this library.
// Props and children are optional and in the same combinations as above.
// Typescript will still check valid tag properties when created via this API.
html.makeElement('my-custom-tag', props, children);

// Property names map to JS properties instead of HTML attribute names.
html.span({className: 'example'});

// Style properties can be set in the same way.
html.span({style: {color: 'red'}});

// Children can be either elements or strings.
// Strings will be safely converted to TextNodes.
html.p(["Hello, ", html.strong("world"), "!"]);

// Normally, you can't directly set the classList property to an array,
// but this library has a special case to handle it.
html.div({classList: ['one', 'two']});
```

## Typescript

``` typescript
// This will produce a type error because div has no 'src' attribute.
html.div({src: 'http://example.com'});

// This will produce a type error because className must be a string.
html.h1({className: 123});
```

## Example

### Before

``` typescript
function makeSection() {
    const section = document.createElement('section');
    section.id = 'mySection';

    const h2 = document.createElement('h2');
    h2.classList.add('extra');
    h2.classList.add('special');
    h2.textContent = 'Example';

    const p = document.createElement('p');
    p.textContent = 'Hello, world!';

    const hr = document.createElement('hr');

    section.appendChild(h1);
    section.appendChild(p);
    section.appendChild(hr);

    return section;
}
```

### After

``` typescript
import * as html from "pithy2";

function makeSection() {
    return html.section({id: 'mySection'}, [
        html.h2({classList: ['extra', 'special']}, [
            'Example'
        ]),
        html.p(['Hello, world!']),
        html.hr()
    ]);
}
```
