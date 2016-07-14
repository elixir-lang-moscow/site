ExUnit.start

Mix.Task.run "ecto.create", ~w(-r ElixirLangMoscow.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r ElixirLangMoscow.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(ElixirLangMoscow.Repo)

