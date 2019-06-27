# Pithy 2

A less painful API for generating raw DOM Elements - inspired by
[pithy](https://github.com/caolan/pithy).

Integrates well with Typescript - checks you're setting acceptable
property values for the given tag etc.

## Before

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

## After

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

## Usage

- Tag names can be called with no arguments `html.a()`, just
  properties `html.a({href: '#'})`, just children `html.a(['click me'])`,
  or both properties and children `html.a({href: '#'}, ['click me'])`.
- Custom tag names can be generated using `makeElement('my-tag-name',
  props, children)`, and typescript will continue to check the tag
  properties correctly when created this way.
- Property names map directly to JS properties on the DOM element
  (e.g. `className` instead of `class`).
- Children can be any `Node()` or string. Strings are safely converted
  to `TextNode`s.
- Normally, you can't set the `classList` property directly to an
  Array of strings, but I've added a special case to allow this.

## Checking properties with Typescript

``` typescript
// This will produce a type error because div has no 'src' attribute.
html.div({src: 'http://example.com'});

// This will produce a type error because className must be a string.
html.h1({className: 123});
```
