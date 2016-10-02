defmodule ElixirLangMoscow.Repo.Migrations.AlterTablesUtilsData do
  use Ecto.Migration

  def change do
    alter table(:event_speakers) do
      add :order, :integer, default: 1
    end

    alter table(:events) do
      add :registration_opened, :boolean, default: false
      add :looking_for_speakers, :boolean, default: false
    end

  end
end
