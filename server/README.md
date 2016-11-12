# GraphQL DataLoader Boilerplate

[![CircleCI](https://circleci.com/gh/sibelius/graphql-dataloader-boilerplate.svg?style=svg)](https://circleci.com/gh/sibelius/graphql-dataloader-boilerplate)
[![codecov](https://codecov.io/gh/sibelius/graphql-dataloader-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/sibelius/graphql-dataloader-boilerplate)

Very simple boilerplate using GraphQL and DataLoader

## Command

#### Setup
```bash
npm install
```
#### Develop
```bash
npm run watch
```

#### Production
```bash
# first compile the code
npm run build

# run graphql compiled server
npm start
```

### Flow
```bash
npm run flow
```

Or
```bash
flow
```

### REPL server
```bash
npm run repl

awesome > M.User.find()
```

### Schema
Update your schema
```bash
npm run update-schema
```

Take a look on the [Schema](https://github.com/sibelius/graphql-dataloader-boilerplate/blob/master/data/schema.graphql)
