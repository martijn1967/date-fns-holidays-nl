Get Dutch public holidays

# Installation

### npm

```console
$ npm install holidays-nl
```

### yarn

```console
$ yarn add holidays-nl
```

## Usage

```js
const holidays = require('holidays-nl');
```
or
```ts
import holidays from 'holidays-nl';
```

### Example

```ts
const holidays = new Holidays()

holidays.easter(); // => Date[]
```

or

```ts
const holidays = new Holidays(2022);

holidays.pinksteren(); // => Date[]
```

### Documentation

See documentation folder.
