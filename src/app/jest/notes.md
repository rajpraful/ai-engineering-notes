# Jest

Writing and grouping tests.

## test / it

`test` and `it` are the same: they're used to create a particular test.

```js
test(name, fn, timeout);
```

`fn` is the callback function which contains the test logic, with the `expect` method.

## describe

`describe(name, fn)` creates a block that groups related tests together into a **test suite**.

```js
describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

```text
describe('sum')               ← test suite
├── test('adds two numbers')   ← test
└── it('handles negative…')    ← test
```
