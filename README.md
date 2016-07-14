# ElixirLangMoscow

## Requirements

You will need:

  * erlang
  * elixir
  * node
  * postgres
  * docker (optional)

## Installation

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

## Docker

To run app in `docker` container:

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

  1. Run `mix deps.get && mix compile`
  2. Run `mix test` to ensure that everything is fine
  3. Run `mix ecto.setup`
  4. Run `mix phoenix.server`

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

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
