# Contributing to Moloch

:sparkles: Glad to see you here! :sparkles:

---

### Just have a question :question:

* Talk to us directly in the [Moloch-FPC Slack](https://slackinvite.molo.ch/)

---

### Where do I start? :traffic_light:

First, checkout this repo and open the `index.html` page in your browser.

> **Note:** links will not work, so if you want to visit another page, you must enter it into the browser URL bar (e.g. `faq.html` or `estimators.html`)

**Then, edit the HTML/JS/CSS in your favorite editor!**

---

### How do I contribute?

#### Documentation! :page_with_curl:

The FAQs, wikis, and page styles are important. Please help improve and add to them.

#### Bugs :bug: :beetle: :ant:

**Before submitting a bug report:**
* Ensure the bug was not already reported by searching for [existing issues in Moloch](https://github.com/aol/molochweb/issues)
  * If an issues is already open, make a comment that you are experiencing the same thing and provide any additional details

Bugs are tracked as [GitHub Issues](https://guides.github.com/features/issues/).
**Please follow these guidelines when submitting a bug:**
* Provide a clear and descriptive title
* Describe the exact steps to reproduce the problem
* Explain the expected behavior
* Fill out the [issue template](https://github.com/aol/molochweb/issues/new) completely

#### Feature Requests :sparkles:

Feature requests include new features and minor improvements to existing functionality.

Feature requests are tracked as [GitHub Issues](https://guides.github.com/features/issues/).
**Please follow these guidelines when submitting a feature request:**
* Provide a clear and descriptive title
* Describe the suggested feature in as much detail as possible
* Use examples to help us understand the use case of the feature
* If you are requesting a minor improvement, describe the current behavior and why it is not sufficient
* If possible, provide examples of where this feature exists elsewhere in other tools
* Follow the directions in the [issue template](https://github.com/aol/molochweb/issues/new)

#### Pull Requests :muscle:

**We welcome all collaboration!** If you can fix it or implement it, please do! :hammer:

**To better help us review your pull request, please follow these guidelines:**
* Provide a clear and descriptive title
* Clearly describe the problem and solution
* Include the relevant issue number(s) if applicable
* Make sure the HTML and rendered page conform the style guide (below)

---

### Style Guide

This site uses the [Bootstrap](https://getbootstrap.com/) toolkit for all its style and layout. It's a good idea to get familiar with this toolkit before contributing.

#### CSS Styles

All of the site's styles are included in the `index.css` file. If you add styles to this file, make them as specific as possible and include a comment to describe their intended purpose. For example do this:

```
/* make the background purple for the super awesome content */
body.faq-body div.super-awesome-style {
  background-color: purple;
}
```

Not this:

```
.super-awesome-style {
  background-color: purple;
}
```

#### FAQ Styles

The FAQ page is made up of two main parts, the table of contents on the left and the main content. For every answered question, there should be a corresponding table of contents link that navigates to the question in the main content. Make sure to put the link in the correct subsection; when in doubt, put it in the General section. Here's what a link should look like:

```
<a class="nav-link nested"
  href="#case-sensitive-id"
  title="Example TOC Link">
  Example TOC Link
</a>
```

And the corresponding section in the main content should look like this:

```
<h3 id="case-sensitive-id">
  Example TOC Link
</h3>
<p>
  Answer goes here...
</p>
```

> **Note:** the `href="#id"` link in the table of contents MUST match the `id` of the section within the main content (case sensitive).

If a question has multiple sections, wrap the additonal sections in another div that has additional margins:

```
<h3 id="main-question">
  Main Question
</h3>
<p>
  Main question text that tells the reader to read the other sections:
</p>
<div class="ml-5 mr-5">
 <h4>
   First section
 </h4>
 <p>
   First section answer...
 </p>
 <h4>
   Second section
 </h4>
 <p>
   Second section answer...
 </p>
</div>

```

> **Note:** the main section is an `h3` header, the subsections are `h4`.

> **Note:** there is no need to add links in the table of contents to the subsections, just link to the main question.

---

### :heart: Thanks,
Andy & Elyse
