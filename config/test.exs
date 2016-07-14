use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :elixir_lang_moscow, ElixirLangMoscow.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :elixir_lang_moscow, ElixirLangMoscow.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "elixir_lang_moscow_test",
  hostname: "db",
  pool: Ecto.Adapters.SQL.Sandbox
