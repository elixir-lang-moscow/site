defmodule ElixirLangMoscow.Repo.Migrations.CreatePartner do
  use Ecto.Migration

  def change do
    create table(:partners) do
      add :name, :string
      add :link, :string
      add :image, :string

      timestamps
    end

    create unique_index(:partners, [:name])

  end
end
