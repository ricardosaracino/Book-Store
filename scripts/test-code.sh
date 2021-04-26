# install packages
npm install --force

# build aot
ng run build:aot

# run unit tests
npm run test:headless

# run protactor test
ng e2e

# run lint
npm run lint
