ExUnit.start

# TODO: add ex_machina

Mix.Task.run "ecto.reset", ~w(-r ElixirLangMoscow.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(ElixirLangMoscow.Repo)
