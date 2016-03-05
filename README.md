# Blogware

A static site generator for hosting full-featured Ghost blog on GitHub Pages. [Demo][]

  [Demo]: http://casper-demo.blogware.io/

## Quick start

Install `blogware` globally with `npm`:

```
$ npm install -g blogware
```

Download a prebuilt theme:

```
$ curl -L https://github.com/blogware/blogware-theme-casper/archive/master.zip -o master.zip
$ unzip master.zip
$ mv blogware-theme-casper-master myblog
$ cd myblog
```

Start building your site on localhost:

```
$ blogware serve
```

Publish to GitHub pages when ready:

```
$ blogware publish
```
