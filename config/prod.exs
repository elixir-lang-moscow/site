use Mix.Config

config :elixir_lang_moscow, ElixirLangMoscow.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [
    scheme: "https",
    host: "peaceful-scrubland-19460.herokuapp.com",
    port: 443
  ],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Configure Database
config :elixir_lang_moscow, ElixirLangMoscow.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true

# Do not print debug messages in production
config :logger, level: :info

# Configure Auth
config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")

# Finally import the config/prod.secret.exs
# which should be versioned separately.
# import_config "prod.secret.exs"
