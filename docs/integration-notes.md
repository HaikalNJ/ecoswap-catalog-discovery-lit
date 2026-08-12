# EcoSwap Integration Notes

## Method

The suggested first integration method is **iframe composition**.

The shell loads each independently deployed URL:

1. Catalog & Discovery - Lit + Material Web
2. Cart & Checkout - framework chosen by the second member
3. Account & Orders - framework chosen by the third member

## Why this method

- It works even when every member uses a different framework.
- Each repository stays independent and deployable.
- The shell does not copy the members' source code.
- It is easier for a beginner group to test and explain.

## Communication

Catalog sends these message types to the shell:

- `catalog:add-to-cart`
- `catalog:wishlist-toggle`
- `catalog:contact-seller`
- `catalog:navigate`

The parent receives this structure:

```js
{
  source: "ecoswap-catalog",
  type: "catalog:add-to-cart",
  detail: {
    product,
    productId,
    quantity
  }
}
```

## One thing harder than expected

Sharing state between independently deployed applications was harder than
building the pages. A click inside an iframe does not automatically reach the
shell, so the applications need an agreed message format. We solved that by
using a small `postMessage` event contract.

## Security note

During local development, the demo sends messages with `"*"` as the target
origin. Before the final deployment:

1. Replace `"*"` with the exact shell URL origin.
2. In the shell, ignore messages whose `event.origin` is not one of the three
   approved component origins.

## Final placeholders

```text
Shell URL:   ____________________________________
Catalog URL: ____________________________________
Cart URL:    ____________________________________
Account URL: ____________________________________
```
