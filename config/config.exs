# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configure Endpoint
config :elixir_lang_moscow, ElixirLangMoscow.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "some-development-key-asN9NTFGVgOzdXjO-change-it-for-production-pls",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: ElixirLangMoscow.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure Generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configure Auth
config :guardian, Guardian,
  issuer: "ElixirLangMoscow",
  ttl: {30, :days},
  verify_issuer: true,  # optional
  secret_key: "<guardian development secret key>",
  serializer: ElixirLangMoscow.GuardianSerializer

# Configure Administration
config :xain, :quote, "'"
config :xain, :after_callback, {Phoenix.HTML, :raw}

config :ex_admin,
  theme: ExAdmin.Theme.ActiveAdmin,
  repo: ElixirLangMoscow.Repo,
  module: ElixirLangMoscow,
  modules: [
    ElixirLangMoscow.ExAdmin.Event,
    ElixirLangMoscow.ExAdmin.EventSpeaker,
    ElixirLangMoscow.ExAdmin.Speaker,
    ElixirLangMoscow.ExAdmin.Registration,
    ElixirLangMoscow.ExAdmin.SuggestedTalk,
    ElixirLangMoscow.ExAdmin.Partner,
    ElixirLangMoscow.ExAdmin.EventPartner,
    ElixirLangMoscow.ExAdmin.Admin,
  ]

# Configure Image Hosting
config :arc,
  bucket: "elixir-lang-moscow",
  virtual_host: true

config :ex_aws,
  access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY"),
  s3: [
    scheme: "https://",
    host: "s3-eu-west-1.amazonaws.com",
    region: "eu-west-1"
  ]

# Configure Timepad
config :elixir_lang_moscow, :timepad,
  key: System.get_env("TIMEPAD_KEY")

# Configure emails
config :elixir_lang_moscow, ElixirLangMoscow.Mailer,
  adapter: Swoosh.Adapters.Local

# Configure ReCaptcha
config :recaptcha,
    public_key: {:system, "RECAPTCHA_PUBLIC_KEY"},
    secret: {:system, "RECAPTCHA_PRIVATE_KEY"}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
