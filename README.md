# ElixirLangMoscow

[![Build Status](https://travis-ci.org/elixir-lang-moscow/site.svg?branch=master)](https://travis-ci.org/elixir-lang-moscow/site) [![Coverage Status](https://coveralls.io/repos/github/elixir-lang-moscow/site/badge.svg?branch=master)](https://coveralls.io/github/elixir-lang-moscow/site?branch=master) [![Docker pulls](https://img.shields.io/docker/pulls/sobolevn/elixir_lang_moscow.svg)](https://hub.docker.com/r/sobolevn/elixir_lang_moscow/~/dockerfile/) [![](https://images.microbadger.com/badges/image/sobolevn/elixir_lang_moscow.svg)](https://microbadger.com/images/sobolevn/elixir_lang_moscow "Get your own image badge on microbadger.com")

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
  - ReCaptcha: set `RECAPTCHA_KEY`

## Docker

To run app in `docker` container:

  0. Clone the repo
  1. Run `docker-compose build`
  2. Run `docker-compose run web mix test` to test the installation
  3. Run `docker-compose run web mix ecto.setup`
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
  3. Run `mix ecto.setup`
  4. Install Node.js dependencies with `npm install`
  5. Start Phoenix endpoint with `mix phoenix.server`. Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Creating admin account

Run:

```bash
mix command.create.admin username:$YOUR_NAME password:$YOUR_PASS password_confirmation:$YOUR_PASS
```

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
 