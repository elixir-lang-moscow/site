defmodule ElixirLangMoscow.Repo.Migrations.CreateSuggestedTalk do
  use Ecto.Migration

  def change do
    create table(:suggested_talks) do
      add :name, :string
      add :email, :string
      add :topic, :string
      add :message, :string
      add :seen, :boolean, default: false

      timestamps
    end

  end
end
