defmodule ElixirLangMoscow.Repo.Migrations.CreateEvent do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :name, :string
      add :location, :string
      add :time_at, :datetime

      add :uid, :string
      add :registration_link, :string
      add :max_registrations, :integer

      timestamps
    end
    create index(:events, [:time_at])

    create unique_index(:events, [:uid])
  end
end
