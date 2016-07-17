defmodule ElixirLangMoscow.Mixfile do
  use Mix.Project

  def project do
    [
      app: :elixir_lang_moscow,
      version: "0.0.1",
      elixir: "~> 1.2",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      aliases: aliases,
      deps: deps,

      # Test coverage:
      test_coverage: [tool: ExCoveralls],
      preferred_cli_env: [
        "coveralls": :test,
        "coveralls.detail": :test,
        "coveralls.post": :test,
        "coveralls.html": :test,
      ],
   ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {ElixirLangMoscow, []},
     applications: [
       :phoenix, :phoenix_html, :cowboy,
       :logger, :gettext, :phoenix_ecto,
       :postgrex, :comeonin, :ex_aws,
       :httpoison,
     ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      # Phoenix:
      {:phoenix, "~> 1.1.4"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_ecto, "~> 2.0"},
      {:phoenix_html, "~> 2.4"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.9"},
      {:cowboy, "~> 1.0"},

      # Auth:
      {:guardian, "~> 0.10.0"},
      {:comeonin, "~> 2.4"},

      # Administration:
      {:ex_admin, "~> 0.7"},

      # Amazon image hosting:
      {:ex_aws, "~> 0.4.10"},
      {:httpoison, "~> 0.7"},

      # Images uploads:
      {:arc, "~> 0.5.2"},
      {:arc_ecto, "~> 0.3.2"},

      # Slugs:
      {:slugger, "~> 0.1.0"},

      # Tests:
      {:exvcr, "~> 0.7", only: :test},
      {:excoveralls, "~> 0.5", only: :test},

      # Lint:
      {:dogma, "~> 0.1", only: [:dev, :test]},
    ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"]]
  end
end
