defmodule ElixirLangMoscow.Repo.Migrations.CreateSpeaker do
  use Ecto.Migration

  def change do
    create table(:speakers) do
      add :name, :string
      add :company, :string
      add :slug, :string
      add :avatar, :string

      timestamps
    end

    create unique_index(:speakers, [:slug])

  end
end
