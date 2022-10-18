
## Option --json

Some gh commands support exporting the data as JSON as an alternative to their usual line-based plain text output. 

This is suitable for passing structured data to scripts. The JSON output is enabled with the `--json` option, followed by the list of fields to fetch. 

Use the flag without a value to get the list of available fields.

```
$ gh issue list

Showing 2 of 2 open issues in crguezl/learning-graphql-with-gh

#2  second issue        about 6 days ago
#1  First test issue    about 6 days ago
```

If we specify a list of comma separated fields we get those fields in JSON format:

```
$ gh issue list --json number,title,body
[
  {
    "body": "second",
    "number": 2,
    "title": "second issue"
  },
  {
    "body": "💯  bien!",
    "number": 1,
    "title": "First test issue"
  }
]
```
