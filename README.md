# pookie
Tiny object database for use as application state. The query engine is a map/filter/reduce function that automatically re-runs on record change and add.

## About

How do you keep track of views of data that depend on other views of data?
How do you make it easy to understand, to visualize, strategize and manage?

## Tree

### he root of a tree can be viewed as a list of objects:

`` `
  [{}
   {}
   {}
   {}
   {}
   {}
   {}
   {}
   {}
   {}]

```

### Todo List Example:  At first consider only one layer of views:

```
  [{}  complete tasks     <-\
   {}  ^                     \
   {}  |                      }------ VIEWS OF DATA!
   {} /                      /
   {}/  incomplete tasks  <-/
   {}  ^
   {} /
   {}/
   {}
   {}
   {}] <-- tree root is a list of all tasks

```

### Like with glasses, you will know when you need them
