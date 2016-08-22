defmodule ElixirLangMoscow.Repo.Migrations.CreateEventPartner do
  use Ecto.Migration

  def change do
    create table(:event_partners) do
      add :event_id, references(:events, on_delete: :nothing)
      add :partner_id, references(:partners, on_delete: :nothing)

      timestamps
    end
    
    create index(:event_partners, [:event_id])
    create index(:event_partners, [:partner_id])

  end
end
