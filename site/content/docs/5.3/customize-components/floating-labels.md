---
layout: docs
title: Floating labels
description: Create beautifully simple form labels that float over your input fields.
group: forms
toc: true
---

## Example

Wrap a pair of `<input class="form-control">` and `<label>` elements in `.form-floating` to enable floating labels with
Bootstrap's textual form fields. A `placeholder` is required on each `<input>` as our method of CSS-only floating labels
uses the `:placeholder-shown` pseudo-element. Also note that the `<input>` must come first so we can utilize a sibling
selector (e.g., `~`).

{{< example >}}
<div class="floating-label mb-3">
  <input type="email" class="form-control" id="floatingInput1" placeholder="name@example.com">
  <label for="floatingInput1">Email address</label>
</div>
<div class="floating-label mb-3">
  <input type="password" class="form-control" id="floatingPassword1" placeholder="Password">
  <label for="floatingPassword1">Password</label>
</div>
{{< /example >}}

## Textareas

By default, `<textarea>`s with `.form-control` will be the same height as `<input>`s.

{{< example >}}
<div class="floating-label mb-3">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">Comments</label>
</div>
{{< /example >}}

## Selects

Other than `.form-control`, floating labels are only available on `.form-select`s. They work in the same way, but
unlike `<input>`s, they'll always show the `<label>` in its floated state. **Selects with `size` and `multiple` are not
supported.**

{{< example >}}
<div class="floating-label mb-3">
  <select id="select1" class="form-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </select>
  <label for="select1">Select One</label>
</div>
{{< /example >}}

## Disabled

Add the `disabled` boolean attribute on an input, a textarea or a select to give it a grayed out appearance, remove
pointer events, and prevent focusing.

{{< example >}}
<div class="floating-label mb-3">
  <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled>
  <label for="floatingInputDisabled">Email address</label>
</div>
<div class="floating-label mb-3">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextareaDisabled" disabled></textarea>
  <label for="floatingTextareaDisabled">Comments</label>
</div>

<div class="floating-label mb-3">
  <select class="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example" disabled>
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <label for="floatingSelectDisabled">Works with selects</label>
</div>
{{< /example >}}

## Input groups

Floating labels also support `.input-group`.

{{< example >}}
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
    <div class="floating-label">
    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
    <label for="floatingInputGroup1">Username</label>
  </div>
</div>
{{< /example >}}

When using `.input-group` and `.form-floating` along with form validation, the `-feedback` should be placed outside of
the `.form-floating`, but inside of the `.input-group`. This means that the feedback will need to be shown using
javascript.

{{< example >}}
<div class="input-group has-validation">
  <span class="input-group-text">@</span>
  <div class="floating-label is-invalid">
    <input type="text" class="form-control is-invalid" id="floatingInputGroup2" placeholder="Username" required>
    <label for="floatingInputGroup2">Username</label>
  </div>
  <div class="invalid-feedback">
    Please choose a username.
  </div>
</div>
{{< /example >}}

## Layout

When working with the Bootstrap grid system, be sure to place form elements within column classes.

{{< example >}}
<div class="row g-2">
  <div class="col-md">
    <div class="floating-label">
      <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value="mdo@example.com">
      <label for="floatingInputGrid">Email address</label>
    </div>
  </div>
  <div class="col-md">
    <div class="floating-label">
    <select class="form-select" id="floatingSelectGrid">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <label for="floatingSelectGrid">Works with selects</label>
    </div>
  </div>
</div>
{{< /example >}}

## Sass

### Variables

{{< scss-docs name="floating-label-variables" file="scss/_variables.scss" >}}
