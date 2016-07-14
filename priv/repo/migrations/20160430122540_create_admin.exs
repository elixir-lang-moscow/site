defmodule ElixirLangMoscow.Repo.Migrations.CreateAdmin do
  use Ecto.Migration

  def change do
    create table(:admins) do
      add :username, :string
      add :password_hash, :string
      add :active, :boolean, default: true

      timestamps
    end

    create unique_index(:admins, [:username])

  end
end
