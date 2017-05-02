## VPV Base Shopify Theme
============

##### Description:
This is V+V's work-in-progress Shopify base theme. When you start a new Shopify theme, you can pull from the Master branch to jumpstart setup by following the instructions below. Log feature requests in the [issues tab](https://github.com/verbalplusvisual/shopify_theme/issues), along with any actual problems/bugs.

If you are developing a new feature be sure to switch to a new branch on your local machine before beginning work and/or pushing to the repo. The master branch is protected, so only admins will be able to merge edits to the master, produciton branch. To submit pull requests for review, submit a [pull request](https://github.com/verbalplusvisual/shopify_theme/pulls) for your branch - be sure to include notes on the changes/updates.


To initialize run:
  - `git clone git@github.com:dnordby/shopify-base.git`
  - `git remote remove origin`
  - `git remote add origin git@github.com:[link-to-your-new-repo-here].git`
  - `npm install`
  - Rename `example-config.yml` to `config.yml` and replace password, theme ID, and store fields. For additional help, check out the [Themekit documentation](http://shopify.github.io/themekit/).
  - `theme replace`

To begin coding:
 - Open terminal and run each of the following commands in **separate** tabs:
   - `theme watch`
   - `webpack --watch`
