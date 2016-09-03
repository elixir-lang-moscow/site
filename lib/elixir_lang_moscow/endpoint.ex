defmodule ElixirLangMoscow.Endpoint do
  use Phoenix.Endpoint, otp_app: :elixir_lang_moscow

  socket "/socket", ElixirLangMoscow.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: :elixir_lang_moscow, gzip: false,
    only: ~w(css fonts images themes js favicons favicon.ico robots.txt humans.txt b93407e6a2ac.html)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_elixir_lang_moscow_key",
    signing_salt: "fbpPxffY"

  plug ElixirLangMoscow.Router
end
