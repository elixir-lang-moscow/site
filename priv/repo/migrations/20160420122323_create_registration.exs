defmodule ElixirLangMoscow.Repo.Migrations.CreateRegistration do
  use Ecto.Migration

  def change do
    create table(:registrations) do
      add :first_name, :string
      add :last_name, :string
      add :company, :string
      add :email, :string

      add :uid, :string
      add :code, :string
      add :barcode, :string
      add :active, :boolean, default: true

      add :event_id, references(:events, on_delete: :nothing)

      timestamps
    end
    
    create index(:registrations, [:event_id])
    create unique_index(:registrations, [:email, :event_id], 
      name: :registrations_email_event_id_index)

    # Event-based indexes:
    create unique_index(:registrations, [:uid])
    create unique_index(:registrations, [:code])
    create unique_index(:registrations, [:barcode])

  end
end
