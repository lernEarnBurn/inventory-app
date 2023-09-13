export const config = {
    '--pattern-seed': {
      syntax: '<number>',
      initialValue: 1000,
      inherits: true,
    },
    '--pattern-colors': {
      syntax: '<color>#',
      initialValue: ['#161511', '#107a53', '#f2f2f2'],
      inherits: true,
    },
    '--pattern-speck-count': {
      syntax: '<number>',
      initialValue: 1000,
      inherits: true,
    },
    '--pattern-speck-min-size': {
      syntax: '<number>',
      initialValue: 0,
      inherits: true,
    },
    '--pattern-speck-max-size': {
      syntax: '<number>',
      initialValue: 3,
      inherits: true,
    },
};