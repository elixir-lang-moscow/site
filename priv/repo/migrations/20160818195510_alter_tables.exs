defmodule ElixirLangMoscow.Repo.Migrations.MinorAlters do
  use Ecto.Migration

  def change do
    alter table(:event_partners) do
      add :priority, :integer, default: 1
    end

    alter table(:events) do
      add :on_air, :boolean, default: false
      add :translation_link, :string

      add :visible, :boolean, defaule: true
    end

  end
end
