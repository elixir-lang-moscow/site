# ElixirLangMoscow

[![Build Status](https://travis-ci.org/elixir-lang-moscow/site.svg?branch=master)](https://travis-ci.org/elixir-lang-moscow/site)
[![Coverage Status](https://coveralls.io/repos/github/elixir-lang-moscow/site/badge.svg?branch=master)](https://coveralls.io/github/elixir-lang-moscow/site?branch=master)
[![Ebert](https://ebertapp.io/github/elixir-lang-moscow/site.svg)](https://ebertapp.io/github/elixir-lang-moscow/site)
[![Docker pulls](https://img.shields.io/docker/pulls/sobolevn/elixir_lang_moscow.svg)](https://hub.docker.com/r/sobolevn/elixir_lang_moscow/~/dockerfile/)
[![Docker size](https://images.microbadger.com/badges/image/sobolevn/elixir_lang_moscow.svg)](https://microbadger.com/images/sobolevn/elixir_lang_moscow)

[![ElixirLangMoscow](https://raw.githubusercontent.com/elixir-lang-moscow/site/master/web/static/assets/images/elixir-lang-moscow-logo.png)](https://elixir-lang-moscow.herokuapp.com/)

## Requirements

You will need:

  * erlang
  * elixir
  * node
  * postgres

Or:

  * docker

### External services

We do use a bunch of integrations, so if you want to replicate the whole project you will need:

  - Amazon AWS: set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  - Mailgun: set `MAILGUN_API_KEY`
  - Timepad: set `TIMEPAD_KEY`
  - ReCaptcha: set `RECAPTCHA_PRIVATE_KEY` and `RECAPTCHA_PUBLIC_KEY`

## Docker

To run app in `docker` container:

  0. Clone the repo
  1. Run `docker-compose build`
  2. Run `docker-compose run web mix test` to test the installation
  3. Run `docker-compose run web mix ecto.setup && mix ecto.migrate`
  4. Run `dcoker-compose up`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

To clean up:

```bash
docker rm -v $(docker ps -a -q -f status=exited)

docker rmi $(docker images -f "dangling=true" -q)
```

## Local

Add these lines to `/ets/hosts`:

```text
# docker
127.0.0.1       docker.local
127.0.0.1       db
```

And now, run:

  0. Clone the repo
  1. Run `mix deps.get && mix compile`
  2. Run `mix test` to ensure that everything is fine
  3. Run `mix ecto.setup && mix ecto.migrate` to setup the database
  4. Install Node.js dependencies with `yarn install` (you may need to install `yarn`)
  5. Start Phoenix endpoint with `mix phoenix.server`. Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Creating admin account

Run:

```bash
mix command.create.admin username:$YOUR_NAME password:$YOUR_PASS password_confirmation:$YOUR_PASS
```

## Development

### Frontend

We use `hackcss` as a css-framework. We use `yarn` as a default package manager for frontend. And `brunch` as an assets-builder.

### Linters

This project uses several linters to lint 'all the things!!!':

- `credo` to lint `elixir` code
- `eslint` to lint `javascript` code
- `sass-lint` to lint `scss` styles

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

