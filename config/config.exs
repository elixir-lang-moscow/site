# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :elixir_lang_moscow, ElixirLangMoscow.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "<some development key>",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: ElixirLangMoscow.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configure Auth:
config :guardian, Guardian,
  issuer: "ElixirLangMoscow",
  ttl: { 30, :days },
  verify_issuer: true, # optional
  secret_key: "<guardian secret key>",
  serializer: ElixirLangMoscow.GuardianSerializer

# Configure Administration:
config :xain, :quote, "'"
config :xain, :after_callback, {Phoenix.HTML, :raw}

config :ex_admin,
  theme: ExAdmin.Theme.AdminLte2,
  theme_selector: [
    {"AdminLte",  ExAdmin.Theme.AdminLte2},
    {"ActiveAdmin", ExAdmin.Theme.ActiveAdmin}
  ],
  repo: ElixirLangMoscow.Repo,
  module: ElixirLangMoscow,
  modules: [
    ElixirLangMoscow.ExAdmin.Event,
    ElixirLangMoscow.ExAdmin.EventSpeaker,
    ElixirLangMoscow.ExAdmin.Speaker,
    ElixirLangMoscow.ExAdmin.Registration,

    ElixirLangMoscow.ExAdmin.Admin,
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
